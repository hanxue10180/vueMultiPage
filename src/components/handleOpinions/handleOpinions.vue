<template>
	<div class="wrapper wrapper-content">
		<div class="row">
			<div style="width:900px">
				<div class="ibox">
					<div class="ibox-title">
						<h5>担保流程</h5> 
					</div>
					<div class="ibox-content" style="overflow:hidden">
						<h3>审核处理意见</h3>
						<textarea  v-model="remarks" rows=7 style="resize: none;margin-bottom:10px;width:99%;"></textarea>
						<div class="left">
							<button class="btn btn-default" @click="back">返回流程一览</button>
						</div>
						<div class="right">
							<button class="btn btn-primary" style="margin-right:10px" v-for="(item,index) in btnlist" @click="btnEvent(index+1)" allow="404,405,407,408" >{{item}}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				btnlist:[],
				flowNodeNumber:'',
				remarks:''
			}
		},
		created(){
			var self = this ; 
			self.flowNodeNumber = self.$route.query.flowNodeNumber
			self.btnlist = self.flowNodeNumber == 404 ? ['通过','立项分配驳回','立项申请驳回'] : ['通过','驳回'] ;
			if(self.$route.query.state == '完结'){
				self.getRemark() ;
			}		
		},
		mounted(){
			$api.checkAllow(null,this.$route.query);
		},
		methods:{
			//获取
			getRemark(){
				var self = this ;
				$api.ajax('/baoliyun/project/getRemark',{
					projectId: self.$route.query.creditProjectId,
					flowNumber: self.$route.query.flowNumber,
					flowNodeNumber: self.$route.query.flowNodeNumber
				},function(data){
					self.remarks = data.obj ;
				})
			},
			//返回按钮事件
			back(){				
				this.$router.push({
					path : '/flowList',
					query: {						
						flowNumber:this.$route.query.flowNumber ,
						creditProjectId:this.$route.query.creditProjectId
					}
			    })
			},
			//其他按钮事件
			btnEvent(index){
				var self = this ;
				var _status,_flowNodeNumber,_txt ;
				if(self.$route.query.flowNodeNumber == 404 ){
					//通过
					if(index==1){
						_status=2;
						_flowNodeNumber=-1;
						_txt = '通过';
					}
					else{
						if(self.remarks){
							//立项分配驳回
							if(index==2){
								_status=3;
								_flowNodeNumber=401;
								_txt = '分配驳回';
							}
							//立项申请驳回
							else if(index==3){
								_status=3;
								_flowNodeNumber=403;
								_txt = '申请驳回';
							}
						}else{
							toast.err('审核意见不能为空')
							return false
						}
					}			
				}else{
					if(index==1){
						_status=2;
						_flowNodeNumber=-1;
						_txt = '通过';
					}
					else if(index==2){
						if(self.remarks){
							_status=3;
							_flowNodeNumber=-1;
							_txt = '驳回';
						}else{
							toast.err('审核意见不能为空')
							return false;
						}
					}
				}
				$api.confirm('确认'+_txt+'吗？', function(){
					$api.ajax('/baoliyun/guarantee/saveProFlow',{
						pId : self.$route.query.creditProjectId,
						flowNumber: self.$route.query.flowNumber ,
						status:_status,
						flowNodeNumber:_flowNodeNumber,
						currentFlowNodeNumber:self.$route.query.flowNodeNumber,
						remark:self.remarks
					},function(data){
						$('.popup_de').remove();
						self.back();
					})
				});		
			}
		}
	}
</script>

