<template>
	<div class="uplodeComponent">
		<div style="margin-bottom:10px">
			<div v-bind:id="btnId" style="width:100px;float:left" v-bind:allow="allows" showHide="1">上传附件</div>
			<button type="button" v-bind:id="delbtnId" class="btn btn-default" @click="delImgArray($event)" v-bind:allow="allows" showHide="1">删除附件</button>
	    </div>
	    <div style="margin-bottom:10px">
	    </div>
		<div class="col-sm-offset-1 imgShow">
			<div class="imgDiv" v-for="imgSrc in imgArray">
				<img @click="imgClick($event)" v-bind:src="getUrl(imgSrc)" />
				<span class="fileName" >{{ getName(imgSrc) }}</span>
				<input type="checkbox" name="uplodeImg" v-bind:value="imgSrc"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				delbtnId : 'del'+this.btnId 
			}
		},
		props:['btnId','imgArray','allows'],
		methods:{
			imgClick:function(e){
				//获取该img的src地址
				var imgSrc=e.target.src;
				if(imgSrc.indexOf('/assets/img/img_')!=-1){
					window.open($(e.target).siblings('input').prop('value'),'_blank');
				}else{
					$api.popBigImg();
				}
				$('.popupShowImg img').prop('src',imgSrc);
			},
			delImgArray:function(e){
				//将事件对象转换为jquery对象
				var $ev=$(e.target);
				//获取选中数组'
				var imgSrcObj=$ev.parents('.uplodeComponent').find('.imgDiv input');
				
				var srcList=[];
				for(var i=0;i<imgSrcObj.length;i++){
					if(imgSrcObj.eq(i).is(':checked')){
						srcList.push(imgSrcObj.eq(i).prop('value'));
					}
				}
				for(var i=0;i<this.imgArray.length;i++){
					for(var j=0;j<srcList.length;j++){
						if(this.imgArray[i]==srcList[j]){
							this.imgArray.splice(i,1);
						}
					}
				}
				//清除checkbox选中状态
				for(var i=0;i<$('.uplodeComponent input[type=checkbox]').length;i++){
					$('.uplodeComponent input[type=checkbox]')[i].checked=false;
				}
			},
			getUrl:function(src){
				var xx=src.substring(src.lastIndexOf('/')+1,src.length);
				var name=xx.substring(32,xx.length);
				var _arr=name.split('.');
				var ext=_arr[_arr.length-1].toLowerCase();
				
				if(ext=='doc' || ext=='pdf' || ext=='xls' ){
					return '../../assets/img/img_'+ext+'.png'
				}else if(ext=='gif' || ext=='jpg' || ext=='jpeg' || ext=='bmp' || ext=='png' ){
					return src
				}else if(ext=='xlsx'){
					return '../../assets/img/img_xls.png'
				}else if(ext=='docx'){
					return '../../assets/img/img_doc.png'
				}else if(ext == 'zip' || ext=='rar'){
					return '../../assets/img/img_zip.png'
				}
			},
			getName:function(src){
				var xx=src.substring(src.lastIndexOf('/')+1,src.length);
				var name=xx.substring(32,xx.length);
				name = name.substring(0,name.lastIndexOf('.'));
				if(name.length>10){
				 	name=name.slice(name.length-10,name.length);
				}
				return name;
			}
		}
	} 
</script>
<style>
	.formInput .imgDiv span,.formInput  .imgDiv input{
		width:140px;
	}
	.imgDiv input[type="checkbox"] {
	    height: 15px;
	}
</style>