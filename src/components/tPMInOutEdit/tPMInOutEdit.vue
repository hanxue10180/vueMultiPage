<template>
	<bPanel>
		<h4 slot="title">第三方费用批量添加修改</h4>
		<div slot="body" >
			<div class="fline">
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">第三方费用</span>
				</formg>
				<formg>
					<span slot="tl">收支区分</span>
					<span slot="ct">支</span>
				</formg>
			</div>
			<div style="overflow-x:scroll;width:100%;margin-bottom:20px;">
				<table  class='table table-bordered table-hover' style="width:2000px;table-layout:fixed;margin-top:20px;">
				<thead>
					<tr>
			    	 	<th style="width:60px;">收支ID</th>
					    <th style="width:105px;">放款批号</th>
					    <th>第三方名称</th>
					    <th>开户行信息</th>
					    <th>银行账号</th>
					    <th>开户名</th>
					    <th>第三方费率（%）</th>
					    <th>系统算出费用</th>
					    <th style="width:90px;">计息日</th>
					    <th style="width:90px;" >结息日</th>
					    <th>金额（元）</th>
					    <th style="width:300px;">业务说明</th>
					    <th style="width:150px;">日期</th>
					    <th style="width:300px;" v-show="state!=1">财务说明</th>
					    <th v-show="state!=1">财务截图</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,index) in list'>
					 	<td v-text="item.id"></td>
					 	<td v-text="info2.creditloanNo"></td>
					 	<td v-text="item.thirdPartyName"></td>
					 	<td v-text="item.bankInfo"></td>
					 	<td v-text="item.bankAccountNumber"></td>
					 	<td v-text="item.payee"></td>
					 	<td v-text="item.loanThirdPartyRatio"></td>
					 	<td v-text="item.expectFee"></td>
					 	<td v-text="getDate(item.currentPeriodInterestBearingDate)"></td>
					 	<td v-text="getDate(item.currentPeriodSettlementDate)"></td>
					 	<td >
					 		<div class="form-group">
					 			<currency type="text" class="form-control"  name="operateAmount" v-model="item.operateAmount" :disabled="state!=1 && state!=3 " allow="szywedit"/>
					 		</div>
					 	</td>
					 	<td>
					 		<div class="form-group">
					 			<textarea name="businessStatements" class="form-control" v-model="item.businessStatements" :disabled="state!=1 && state!=3 " allow="szywedit" ></textarea> 
					 		</div>
					 	</td>
					 	<td>
					 		<div class="form-group">
					 			<dates name="operateDate" v-model="item.operateDate" :disabled="state!=1 && state!=3 " allow="szywedit" />
					 		</div>
					 	</td>
					 	<td v-show="state!=1">
					 		<div class="form-group">
					 			<textarea name="financialStatements" class="form-control" v-model="item.financialStatements" :disabled="state!=2" allow="szcwedit" ></textarea> 
					 		</div>
					 	</td>
					 	<td v-show="state!=1" >
					 		<button class="btn btn-default" v-on:click="upload(item.financialScreenshot,index)" allow="szcwedit" v-text="state==2 ? '上传截图':'查看'"></button>
					 		<button class="btn btn-default" v-on:click="upload(item.financialScreenshot,index)" allow="szywedit,szlook">查看</button>
					 	</td>
					</tr>
				</tbody>
		    </table>
			</div>
			<modal>
				<h4 slot="titles">财务截图</h4>
				<div slot="bodys">
					<imgFlow btn-id="financialScreenshot" v-bind:img-array="imgArr"  allows="szcwedit" ></img-flow>
				</div>
			</modal>
		    <button class="btn btn-default" v-on:click="back">返回</button>
		    <button class="btn btn-primary pull-right" v-if="state==1 || state==3 " v-on:click="submit(3)" allow="szywedit" style="margin-left:20px;">提交</button>
		    <button class="btn btn-default pull-right" v-if="state==1 || state==3 " v-on:click="submit(0)" allow="szywedit">保存</button>
		    <button class="btn btn-primary pull-right" v-if="state==2" v-on:click="submit(1)" allow="szcwedit" style="margin-left:20px;">驳回</button>
		    <button class="btn btn-primary pull-right" v-if="state==2" v-on:click="submit(2)" allow="szcwedit">通过</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import dates from '../dates/dates.vue'
	import modal from '../modal/modal.vue'
	import imgFlow from '../imgFlow/imgFlow.vue'
	import currency from '../currency/currency.vue'
	export default{
		data(){
			return {
				info1:{},
				info2:{},
				list:[],
				imgArr:[],
				index:'',
				state:''
			}
		},
		components:{
			bPanel,
			formg,
			dates,
			modal,
			imgFlow,
			currency
		},
		created(){
			var self = this ;
			self.info1 = JSON.parse(self.$route.query.info1 );
			self.info2 = JSON.parse(self.$route.query.info2 );
			//根据id获取信息
			$api.ajax('/baoliyun/guarantee/getInoutDetail',{
				id : JSON.parse(self.$route.query.ids) 
			},function(data){
				self.list = data.obj ;
				self.state = data.obj[0].creditProcessStatus ;
			},null,{async:false});
		},
		mounted(){
			this.init();
			$api.checkAllow();
		},
		methods:{
			init(){
				var self = this ;
				//初始化截图
				var financialScreenshot=$api.uploadImgsFun('#financialScreenshot',function(evalEle){
					self.imgArr.push(evalEle);
				},'/upload/financialScreenshot/');
		    	//判断状态
		    	if(self.state!=2){
		    		$('#financialScreenshot').hide();
					$('#delfinancialScreenshot').hide();
		    	}
				//打开模态窗时重新初始化
			    $('#myModal').on('shown.bs.modal', function (e) {
			    	financialScreenshot.refresh();
				})
				//关闭模态窗时保存数据
				$('#myModal').on('hide.bs.modal', function (e) {
					self.list[self.index].financialScreenshot = $api.join(self.imgArr);
				})
			},
			back(){
				this.$router.push({
					path:'/thirdPartyList',
					query:{
						info1:this.$route.query.info1,
						info2:this.$route.query.info2
					}
				})
			},
			getDate(num){
				return $api.dateFormat(num) ;
			},
			submit(num){
				var self = this ;
				var _list = $api.vueToObj(self.list) ;
				if(num == 1){
					for(var i=0;i<_list.length;i++){
						if(!_list[i].financialStatements){
							toast.err('驳回财务说明不能为空') ;
							return false;
						}
					}
				}else if(num==0 || num==3){
					self.validator();
					//点击保存时触发表单验证
				    $('table').bootstrapValidator('validate');
				    if(!$('table').data('bootstrapValidator').isValid()){
				    	return false
				    }
				}	        
		        $api.ajax('/baoliyun/guarantee/thirdPartyUpload',{
					mulCommitList:_list ,
					type : num ,
					companyName : self.info1.creditCompanyManageName
				},function(data){
					self.back();
				})
			},
			upload(arr,index){
				this.index = index ;
				this.imgArr = $api.split(arr) ;
				$('#myModal').modal({backdrop: 'static', keyboard: false});
			},
			validator(){
				if(this.state==1 || this.state==3){
					$('table').bootstrapValidator({
				       	feedbackIcons: {
				            valid: 'glyphicon glyphicon-ok',
				            invalid: 'glyphicon glyphicon-remove',
				            validating: 'glyphicon glyphicon-refresh'
				         },
				         fields: {
				            operateAmount:{
				            	validators: {
				                   notEmpty: {
				                       message: '不能为空'
				                   },
					        	   stringLength:{
					        			max:18,
					        			message:'字数超过限制'
					        	   }
				               }
				           }
						}
				    })
				}
			}
		}
	}
</script>
<style >
	table .form-group{
		margin-bottom: 0
	}
	textarea{
		resize: none ;
	}
	th,td{
		text-align: center;
	}
	.uplodeComponent .imgShow{
		margin:0;
		width:95%;
	}
	::-webkit-scrollbar {
	    height:10px;
	    background-color: #F5F5F5;
	}
</style>