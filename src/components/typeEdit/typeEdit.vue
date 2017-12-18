<template>
	<bPanel>
		<h4 slot="title">客户类型修改</h4>
		<div slot="body">
			<div class="fline">
				<formg>
					<span slot="tl">客户名称</span>
					<span slot="ct" v-text='companyName'></span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">系统类型</span>
					<span slot="ct" v-text='systemType==1 ? "卖方":"买方" '></span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">客户类型</span>
					<select class="form-control" slot="ct" name="recommendType" v-model="info.recommendType" allow="jxedit" >
						<option value="1">公司客户</option>
						<option value="2">推荐客户</option>
					</select>
				</formg>
			</div>
			<div class="fline" v-show="info.recommendType == 2">
				<formg>
					<span slot="tl">推荐人</span>
					<select class="form-control" slot="ct" name="recommendLoginname" v-model="info.recommendLoginname" allow="jxedit" >
						<option v-for="item in userList" v-bind:value="item.loginname" v-text="item.name"></option>
					</select>
				</formg>
			</div>
			<div class="fline" style="margin-top:30px;">
				<button class="btn btn-default col-sm-1 col-sm-offset-1" v-on:click="back">返回</button>
				<button class="btn btn-primary col-sm-1 col-sm-offset-1" v-on:click="save" allow="jxedit" >保存</button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return{
				info:{
					id:'',
					recommendType:'',
					recommendLoginname:'',
					updateUser:''
				},
				companyName:'',
				systemType:'',
				userList:[]
			}
		},
		components:{
			bPanel,
			formg
		},
		created(){
			var self = this ;
			self.getUserList();
			var _data =  JSON.parse(self.$route.query.data) ;
			self.info.id = _data.id ;
			self.companyName = _data.companyName ;
			self.systemType = _data.systemType ;
			self.getInfo() ;
		},
		mounted(){
			this.$nextTick(function(){
				$api.checkAllow();
			})
		},
		methods:{
			back(){
				this.$router.go(-1) ;
			},
			save(){
				var self = this ;
				var _info = $api.vueToObj(self.info) ;
				_info.updateUser = $api.getUserInfo().updateUser ;
				if(_info.recommendType == 1){
					_info.recommendLoginname = '' ;
				}
				$api.ajax('/baoliyun/performance/saveCompanyRecommend',_info,function(data){
					self.back();
				})
			},
			getUserList(){
				var self = this ;
				$api.ajax('/baoliyun/user/getUserList',{
					name:'',
					tel:'',
					affiliatedFactoringEnterpriseId:$api.getUserInfo().affiliatedFactoringEnterpriseId,
					pageSize:9999,
					pageIndex:1
				},function(data){
					self.userList = data.obj ;
				},function(data){
					toast.err(data.msg);
				},{async:false})
			},
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getCompanyRecommendDetail',{
					id:self.info.id
				},function(data){
					self.info = data.obj ;
				})
			}
		}

	}
</script>