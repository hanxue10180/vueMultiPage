<template>
	<bPanel>
		<h4 slot="title">人员状况</h4>
		<div slot="body">
			<search ref="search" @getData="getData"></search>
			<div style="clear:both">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#factoringProject" data-toggle="tab">保理项目</a></li>
					<li><a href="#guaranteeProject" data-toggle="tab">担保项目</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane fade in active" id="factoringProject" style="padding-top:20px;">
						<bPanel style="margin-top:20px">
							<h4 slot="title">业务人员参与保理项目放款金额占比</h4>
							<div slot="body">
								<div id="person1" style="width:50%;height:400px;float:left"></div> 
								<img id="img1" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
								<div style="width:50%;float:left;table-layout:fixed; max-height:400px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>姓名</th>
												<th>参与项目放款总额（万）</th>
												<th>占比</th>
												<th>参与项目放款次数</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list1" >
												<td v-text="item.name" v-bind:class="item.name!='合计' ? 'link':''" v-on:click="getDList(item.loginname)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.rate ? item.rate + '%' :''"></td>
												<td v-text="item.count"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
						<bPanel style="margin-top:20px">
							<h4 slot="title">风控人员参与保理项目放款金额占比</h4>
							<div slot="body">
								<div style="width:50%;float:left;table-layout:fixed; max-height:400px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>姓名</th>
												<th>参与项目放款总额（万）</th>
												<th>占比</th>
												<th>参与项目放款次数</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list3" >
												<td v-text="item.name" v-bind:class="item.name!='合计' ? 'link':''" v-on:click="getDList(item.loginname)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.rate ? item.rate + '%' :''"></td>
												<td v-text="item.count"></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="fk1" style="width:50%;height:400px;float:left"></div> 
								<img id="img3" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
							</div>
						</bPanel>
					</div>
					<div class="tab-pane fade" id="guaranteeProject">
						<bPanel>
							<h4 slot="title">业务人员参与担保项目放款金额占比</h4>
							<div slot="body">
								<div id="person2" style="width:55%;height:400px;float:left"></div>
								<img id="img2" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>  
								<div style="width:45%;float:left;table-layout:fixed; max-height:400px;overflow-y:scroll ">
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>姓名</th>
												<th>参与项目放款总额（万）</th>
												<th>占比</th>
												<th>参与项目放款次数</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list2" >
												<td v-text="item.name" v-bind:class="item.name!='合计' ? 'link':''" v-on:click="getDList(item.loginname)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.rate ? item.rate + '%' :''"></td>
												<td v-text="item.count"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
						<bPanel>
							<h4 slot="title">风控人员参与担保项目放款金额占比</h4>
							<div slot="body">
								<div style="width:45%;float:left;table-layout:fixed; max-height:400px;overflow-y:scroll ">
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>姓名</th>
												<th>参与项目放款总额（万）</th>
												<th>占比</th>
												<th>参与项目放款次数</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list4" >
												<td v-text="item.name" v-bind:class="item.name!='合计' ? 'link':''" v-on:click="getDList(item.loginname)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.rate ? item.rate + '%' :''"></td>
												<td v-text="item.count"></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="fk2" style="width:55%;height:400px;float:left"></div>
								<img id="img4" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>  
							</div>
						</bPanel>
					</div>
				</div>
			</div>
			<modal >
				<h4 slot="titles">人员状况详细</h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover" >
						<thead>
							<tr>
								<th>姓名</th>
								<th>角色</th>
								<th>项目类型</th>
								<th>参与项目名称</th>
								<th>项目状态</th>
								<th v-show="type==1">合同编号</th>
								<th v-show="type==1">合同状态</th>
								<th>放款总额（万）</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist">
								<td v-text="item.name"></td>
								<td v-text="item.role"></td>
								<td v-text="type==1 ? '保理项目':'担保项目'"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.projectState"></td>
								<td v-show="type==1" v-text="item.contractNo"></td>
								<td v-show="type==1" v-text="item.contractState"></td>
								<td v-text="item.amounts"></td>
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
				type:1,
				person:[],
				fk:[],
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				dlist:[],
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
			self.$nextTick(function(){
				//监听tab页切换事件
				$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		        	// 获取已激活的标签页的名称
		            var activeTab = $(e.target).text();
		            if(activeTab == '保理项目'){
		            	self.type = 1 ;
		            }else{
		            	self.type = 2 ;
		            	//担保项目授信额度占比
		            	self.person[1]= echarts.init(document.getElementById('person2'));
		            	self.fk[1]= echarts.init(document.getElementById('fk2'));
		            }
		            self.$refs.search.init();
	            })
	            //保理项目授信额度占比
				self.person[0]= echarts.init(document.getElementById('person1'));
				self.fk[0]= echarts.init(document.getElementById('fk1'));
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
				 * 项目授信额度占比
				 */
				$api.ajax('/baoliyun/report/getReportToUserRate',{
					projectType : self.type ,
					start : self.start ,
					end : self.end,
					userType:1
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						self.list1 = _data ;
						$('#person1').show();
						$('#img1').hide();
					}else{
						self.list2 = _data ;
						$('#person2').show();
						$('#img2').hide();
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].name);
						list2.push({
							value:_data[i].rate,
							name:_data[i].name 
						})
					}
					var myObj = {
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
					        	show:false,
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'人员参与项目数占比',
					            type:'bar',
					            barWidth: '60%',
					            data:list2,
					            label:{
					            	normal:{
					            		show:true,
					            		position:'top',
					            		formatter: '{c}%'
					            	}
					            },
					            itemStyle: {
					                normal: {
					                    color: function(params) {
					                        // build a color map as your need.
					                        var colorList = [
					                          '#9BC5EC','#FBA794','#AADFEB','#CBF1FA','#B1B9ED'
					                        ];
					                        return colorList[params.dataIndex%5]
					                    }
					                }
					            }
					        }
					    ]
					}
					self.person[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						self.list1 = [];
						$('#person1').hide();
						$('#img1').show();
					}else{
						self.list2 = [] ;
						$('#person2').hide();
						$('#img2').show();
					}
				})


				$api.ajax('/baoliyun/report/getReportToUserRate',{
					projectType : self.type ,
					start : self.start ,
					end : self.end,
					userType:2
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						self.list3 = _data ;
						$('#fk1').show();
						$('#img3').hide();
					}else{
						self.list4 = _data ;
						$('#fk2').show();
						$('#img4').hide();
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].name);
						list2.push({
							value:_data[i].rate,
							name:_data[i].name 
						})
					}
					var myObj = {
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
					        	show:false,
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'人员参与项目数占比',
					            type:'bar',
					            barWidth: '60%',
					            data:list2,
					            label:{
					            	normal:{
					            		show:true,
					            		position:'top',
					            		formatter: '{c}%'
					            	}
					            },
					            itemStyle: {
					                normal: {
					                    color: function(params) {
					                        // build a color map as your need.
					                        var colorList = [
					                          '#9BC5EC','#FBA794','#AADFEB','#CBF1FA','#B1B9ED'
					                        ];
					                        return colorList[params.dataIndex%5]
					                    }
					                }
					            }
					        }
					    ]
					}
					self.fk[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						self.list3 = [];
						$('#fk1').hide();
						$('#img3').show();
					}else{
						self.list4 = [] ;
						$('#fk2').hide();
						$('#img4').show();
					}
				})
			},
			getDList(name){
				var self = this ;
				$api.ajax('/baoliyun/report/getReportToUserRateExt',{
					projectType:self.type,
					start:self.start,
					end:self.end,
					loginname:name
				},function(data){
					self.dlist = data.obj ;
					$('#myModal').modal({backdrop: 'static', keyboard: false}); 
				},function(data){
					toast.err(data.msg);
				})
			}
		}

	}
</script>
<style >
	.modal-dialog{
		width:70%;
	}
</style>