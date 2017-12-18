<template>
	<div>
		<formg>
			<span slot="tl">统计开始日</span>
			<input slot="ct" class="form-control" type="date" name="start" v-model="start"/>
		</formg>
		<formg>
			<span slot="tl">统计结束日</span>
			<input slot="ct" class="form-control" type="date" name="end" v-model="end"/>
		</formg>
		<button class="btn btn-default btn_s" v-on:click="searEvent($event)" >查看</button>
		<button class="btn btn-default btn_s " v-on:click="searEvent($event,0)" >全部</button>
		<button class="btn btn-default btn_s " v-on:click="searEvent($event,7)" >最近7天</button>
		<button class="btn btn-default btn_s" v-on:click="searEvent($event,30)" >最近30天</button>
		<button class="btn btn-default btn_s" v-on:click="searEvent($event,'last')">去年</button>
		<button class="btn btn-default btn_s initbtn" v-on:click="searEvent($event,'now')">今年</button>
	</div>
</template>
<script type="text/javascript">
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return{
				start:'',
				end:''
			}
		},
		components:{
			formg
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				$('.initbtn').click();
			},
			getBeforeDay(n){
				var date = new Date() ;   
			    date.setDate(date.getDate()-n);  
			    return $api.dateFormat(date.getTime());  
			},
			searEvent(e,str){
				$(e.target).addClass('active');
				$('.btn_s').not(e.target).removeClass('active');
				var self = this ;
				//全部
				if(str==0){
					self.start = 0;
					self.end = 0 ;
				}
				//最近七天
				if(str==7 || str==30){
					self.end = self.getBeforeDay(0);
					self.start =  self.getBeforeDay(str); 
				}
				else if(str=='now'){
					self.start = $api.dateFormat(new Date().setFullYear(new Date().getFullYear(),0,1));
					self.end = $api.dateFormat(new Date().setFullYear(new Date().getFullYear(),11,31));
				}
				else if(str == 'last'){
					self.start = $api.dateFormat(new Date().setFullYear(new Date().getFullYear()-1,0,1));
					self.end = $api.dateFormat(new Date().setFullYear(new Date().getFullYear()-1,11,31));
				}
				self.$emit('getData',self.start,self.end);
			}
		}
	}
</script>
<style scoped>  
	.btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover{
		background-color: #1AB394;
    	border-color: #1AB394;
    	color: #FFF;
	}
</style>