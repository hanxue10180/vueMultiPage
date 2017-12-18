<template>
	<bPanel>
		<div slot="title">
			<span style="color:#1AB394;cursor:pointer;margin-right:30px;" v-on:click="back">返回</span>
			<h4 style="display:inline-block">资金状况</h4>			
		</div>
		<div slot="body">
			<div id="principal" style="width:100%;height:400px;"></div> 
			<img id="img1" src="../../assets/img/empty.png" style="width:60%;height:300px;display:block;margin:0 auto"/> 
			<div id="interest" style="width:100%;height:400px;"></div> 
			<img id="img2" src="../../assets/img/empty.png" style="width:60%;height:300px;display:block;margin:0 auto"/> 
			<div style="table-layout:fixed;clear:both" >
				<table class="table table-bordered table-hover" >
					<thead>
						<tr>
							<th>项目类型</th>
							<th>年月日</th>
							<th>预计归还本金（万元）</th>
							<th>实际归还本金（万元）</th>
							<th>预计归还利息（元）</th>
							<th>实际归还利息（元）</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list" >
							<td v-text="item.projectType"></td>
							<td v-text="item.atime ? getDate(item.atime):''"  v-on:click="item.atime ? getDList(item.atime) : ''" v-bind:class="item.atime ? 'link':''"></td>
							<td v-text="item.planRepayPrincipal"  ></td>
							<td v-text="item.actualRepayPrincipal"></td>
							<td v-text="item.planRepayInterest"></td>
							<td v-text="item.actualRepayInterest"></td>
						</tr>
					</tbody>
				</table>
			</div>	
			<modal class="dayModal">
				<h4 slot="titles"></h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>项目类型</th>
								<th>年月日</th>
								<th>项目名称</th>
								<th v-show="type==1">合同编号</th>
								<th>放款批号</th>
								<th v-show="type==1">期数</th>
								<th>预计归还本金（万元）</th>
								<th>实际归还本金（万元）</th>
								<th v-show="type==1">本金清账状态</th>
								<th v-show="type==1">预计归还利息（元）</th>
								<th v-show="type==1">实际归还利息（元）</th>
								<th v-show="type==1">是否存在逾期</th>
								<th v-show="type==1">利息清账状态</th>
								<th v-show="type==2">预计收取利息合计（元）</th>
								<th v-show="type==2">实际收取利息合计（元）</th>
								<th v-show="type==2">预计支付利息合计（元）</th>
								<th v-show="type==2">实际支付利息合计（元）</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist">
								<td style="width:70px;" v-text="item.projectType"></td>
								<td style="width:90px;" v-text="item.atime ? getDate(item.atime):''"></td>
								<td v-text="item.projectName"></td>
								<td v-show="type==1" v-text="item.contractNo"></td>
								<td v-text="item.loanNo"></td>
								<td v-show="type==1" v-text="item.periods"></td>
								<td v-text="item.planRepayPrincipal"></td>
								<td v-text="item.actualRepayPrincipal"></td>
								<td v-show="type==1" v-text="item.principalState"></td>
								<td v-show="type==1" v-text="item.planRepayInterest"></td>
								<td v-show="type==1" v-text="item.actualRepayInterest"></td>
								<td v-show="type==1" v-text="item.overdue ? '是':'否'"></td>
								<td v-show="type==1" v-text="item.interestState"></td>
								<td v-show="type==2" v-bind:class="item.atime ? 'link':''" v-on:click="getDList1(item.atime,item.loanNo,1)" v-text="item.planRepayInterestRec"></td>
								<td v-show="type==2" v-bind:class="item.atime ? 'link':''"  v-on:click="getDList1(item.atime,item.loanNo,3)" v-text="item.actualRepayInterestRec"></td>
								<td v-show="type==2" v-bind:class="item.atime ? 'link':''"  v-on:click="getDList1(item.atime,item.loanNo,2)" v-text="item.planRepayInterestPay"></td>
								<td v-show="type==2" v-bind:class="item.atime ? 'link':''"  v-on:click="getDList1(item.atime,item.loanNo,4)" v-text="item.actualRepayInterestPay"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</modal>
			<modal class="detailsModal">
				<h4 slot="titles" ></h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>年月日</th>
								<th>项目名称</th>
								<th>放款批号</th>
								<th>费用类型</th>
								<th>收支区分</th>
								<th>金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist1">
								<td v-text="getDate(item.atime)"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.loanNo"></td>
								<td v-text="item.feeType"></td>
								<td v-text="item.payType"></td>
								<td v-text="item.amount"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</modal>							
		</div>
	</bPanel>	
</template>
<script type="text/javascript">
	var echarts = require('echarts/lib/echarts')
	require('echarts/lib/component/legendScroll');
	require('echarts/lib/component/tooltip');
	require('echarts/theme/macarons.js')
	require('echarts/theme/roma.js')
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import search from '../statistics_search/statistics_search.vue'
	import modal from '../modal/modal.vue'
	export default{
		data(){
			return{
				type:'',
				principal:'',
				interest:'',
				list:[],
				dlist:[],
				dlist1:[],
				start:'',
				end:''
			}
		},
		components:{
			bPanel,
			formg,
			search,
			modal
		},
		mounted(){
			var self = this ;
			self.type = self.$route.query.type ;
			self.$nextTick(function(){
				var ys = self.type==1 ? 'roma':'macarons' ;
	            //保理项目授信额度占比
				self.principal= echarts.init(document.getElementById('principal'),ys);
				self.interest= echarts.init(document.getElementById('interest'),ys);
			});
			self.getData();
		},
		methods:{
			back(){
				this.$router.push({
					path:'/capital',
					query:{
						type:this.type,
						start:this.$route.query.start
					}
				});
			},
			getDate(num){
				return $api.dateFormat(num);
			},
			getData(){
				var self = this ;
				var time = self.$route.query.time.split('-');
				//开始日 当前月一号
				self.start =$api.getLong($api.dateFormat(new Date().setFullYear(time[0]-0,time[1]-1,1)))/1000;
				//结束日 当前月的最后一天
				self.end =$api.getLong($api.dateFormat(new Date().setFullYear(time[0]-0,time[1],1)-86400000))/1000;
				/*
				 * 日归还本息
				 */
				$api.ajax('/baoliyun/report/getReportToPrincipalDaily',{
					projectType : self.type ,
					dailyFlag:1,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					self.list = _data ;
					$('#principal').show();
					$('#interest').show();
					$('#img1').hide();
					$('#img2').hide();
					var list1=[],list2=[],list3=[],list4=[],list5=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(self.getDate(_data[i].atime).split('-')[2]);
						list2.push(_data[i].planRepayPrincipal);
						list3.push(_data[i].actualRepayPrincipal);
						list4.push(_data[i].planRepayInterest);
						list5.push(_data[i].actualRepayInterest);
					}
					var myObj1 = {
						title:{
							show:true,
							text:'日度归还本金情况'
						},
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['预计归还本金','实际归还本金']
					    },
					    grid:{
					    	height:'75%',
					    	width:'80%',
					    	left:'10%',
					    	bottom:'15%'
					    },
					    xAxis : [
					        {
					        	show:true,
					            type : 'category',
					            data : list1,					   
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {
								    interval:0,//横轴信息全部显示
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value} 万元'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'预计归还本金',
					            type:'bar',
					            data:list2
					        },
					        {
					            name:'实际归还本金',
					            type:'bar',
					            data:list3,
					            barGap:0
					        }
					    ]
					}
					self.principal.setOption(myObj1) ;	

					var myObj2 = {
						title:{
							show:true,
							text:'日度归还利息情况'
						},
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['预计归还利息','实际归还利息']
					    },
					    grid:{
					    	height:'75%',
					    	width:'80%',
					    	left:'10%',
					    	bottom:'15%'
					    },
					    xAxis : [
					        {
					        	show:true,
					            type : 'category',
					            data : list1,					   
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {
								    interval:0,//横轴信息全部显示
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value}元'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'预计归还利息',
					            type:'bar',
					            data:list4
					        },
					        {
					            name:'实际归还利息',
					            type:'bar',
					            data:list5,
					            barGap:0
					        }
					    ]
					}

					self.interest.setOption(myObj2) ;	
				},function(data){
					toast.err(data.msg) ;
					self.list = [] ;
					$('#principal').hide();
					$('#interest').hide();
					$('#img1').show();
					$('#img2').show();
				})
			},
			getDList(time){
				var self = this ;
				$api.ajax('/baoliyun/report/getReportToPrincipalDaily',{
					projectType:self.type,
					dailyFlag:2,
					start:time/1000,
					end:time/1000
				},function(data){
					self.dlist = data.obj ;
					$('.dayModal').modal({backdrop: 'static', keyboard: false}); 
				},function(data){
					toast.err(data.msg);
				})
			},
			getDList1(time,loanN,num){
				var self = this ;
				if(time){
					$api.ajax('/baoliyun/report/getReportToPrincipalDailyDetail',{
						selDate:time/1000,
						loanNo:loanN,
						type:num
					},function(data){
						self.dlist1 = data.obj ;
						$('.detailsModal').modal({backdrop: 'static', keyboard: false}); 
					},function(data){
						toast.err(data.msg);
					})
				}
			}
		}

	}
</script>
<style>
	.dayModal .modal-dialog{
		width:98%;
	}
</style>