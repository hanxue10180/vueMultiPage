<template>
	<bPanel>
		<h4 slot="title">资产转让收支状况</h4>
		<div slot="body">
			<search ref="search" @getData="getData"></search>
			<div id="transfer" style="width:80%;height:450px;margin:0 auto"></div> 
			<img id="img" src="../../assets/img/empty.png" style="width:70%;height:400px;display:block;margin:0 auto"/> 
			<div style="width:80%;table-layout:fixed;margin:0 auto;">				
				<table class="table table-bordered table-hover" >
					<thead>
						<tr>
							<th>项目名称</th>
							<th>合同编号</th>
							<th>放款批号</th>
							<th>转让批号</th>
							<th>转让单位</th>
							<th>统计日期</th>
							<th>收入</th>
							<th>支出</th>
							<th>差额</th>
						</tr>
					</thead>
					<transition-group name="fade"  v-for = "(item,index) in list1" tag="tbody">
						<tr style="cursor:pointer" v-on:click="show=index" :key="'a'+index">
							<td v-text="item.projectName"></td>
							<td v-text="item.contractNo"></td>
							<td v-text="item.loanNo"></td>
							<td v-text="item.transferNo"></td>
							<td v-text="item.transferUnit"></td>
							<td v-text="getDate(item.date)"></td>
							<td v-text="item.income"></td>
							<td v-text="item.expend"></td>
							<td v-text="item.balance"></td>
						</tr>					
						<tr v-for="list in item.type" v-if="index==show" v-bind:key="index">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td v-text="list.name"></td>
							<td v-text="list.income"></td>
							<td v-text="list.expend"></td>
							<td v-text="list.balance"></td>
						</tr>
					</transition-group>
				</table>
			</div>	
		</div>
	</bPanel>	
</template>
<script type="text/javascript">
	var echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/pie')
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
				list1:[],
				start:'',
				end:'',
				transfer:'',
				show:0
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
			self.$nextTick(function(){
				self.transfer= echarts.init(document.getElementById('transfer'),'roma');
			});
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num);
			},
			getData(start,end){
				var self = this ;
				self.start = start!=0 ? $api.getLong(start)/1000 : 0  ;
				self.end = end!=0 ? $api.getLong(end)/1000 : 0 ;
				/*
				 * 项目放款情况
				 */
				$api.ajax('/baoliyun/report/getReportToAssetTransfer',{
					projectType : self.type ,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					self.list1 = _data ;
					$('#transfer').show();
					$('#img').hide();
					var list1=[],list2=[] ,list3=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length;i++){
						list1.push(_data[i].projectName);
						list2.push(_data[i].income);
						list3.push(_data[i].expend) ;
					}
					var myObj = {
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['收入','支出']
					    },
					    grid:{
					    	height:'65%',
					    	width:'70%',
					    	left:'15%',
					    	bottom:'23%'
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
								    rotate:-30//60度角倾斜显示
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value}'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'收入',
					            type:'bar',
					            data:list2
					        },
					        {
					            name:'支出',
					            type:'bar',
					            data:list3
					        }
					    ]
					}
					self.transfer.setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					$('#transfer').hide();
					$('#img').show();
					self.list1 = [] ;
				})
			}
		}

	}
</script>
<style >
	.modal-dialog{
		width:70%;
	}
	.fade-enter-active {
		transition: all 1s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	    opacity: 0;
	}
</style>