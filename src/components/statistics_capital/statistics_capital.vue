<template>
	<bPanel>
		<h4 slot="title">资金状况</h4>
		<div slot="body">
			<div>
				<formg>
					<span slot="tl">统计开始年月</span>
					<input slot="ct" class="form-control" type="month" name="start" v-model="start" v-on:change="getEnd"/>
				</formg>
				<formg>
					<span slot="tl">统计结束年月</span>
					<input slot="ct" class="form-control" type="month" name="end" v-model="end" disabled="disabled" />
				</formg>
				<button class="btn btn-default btn_s" v-on:click="getData($event)" style="width:100px;margin-left:20px;">查看</button>
			</div>
			<div style="clear:both">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#factoringProject" data-toggle="tab">保理项目</a></li>
					<li><a href="#guaranteeProject" data-toggle="tab">担保项目</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane fade in active" id="factoringProject" style="padding-top:20px;">
						<div id="principal1" style="width:50%;height:400px;float:left"></div> 
						<img id="img1" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
						<div id="interest1" style="width:50%;height:400px;float:left"></div> 
						<img id="img2" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
						<div style="table-layout:fixed;clear:both" >
							<table class="table table-bordered table-hover" >
								<thead>
									<tr>
										<th>项目类型</th>
										<th>年月</th>
										<th>预计归还本金（万元）</th>
										<th>实际归还本金（万元）</th>
										<th>差额本金（万元）</th>
										<th>预计归还利息（元）</th>
										<th>实际归还利息（元）</th>
										<th>差额利息（元）</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in list1" >
										<td v-text="item.projectType"></td>
										<td v-text="item.atime" v-bind:class="item.atime ? 'link':''" v-on:click="getDList(item.atime)" ></td>
										<td v-text="item.planRepayPrincipal"  ></td>
										<td v-text="item.actualRepayPrincipal"></td>
										<td v-text="item.diffPrincipal"></td>
										<td v-text="item.planRepayInterest"></td>
										<td v-text="item.actualRepayInterest"></td>
										<td v-text="item.diffInterest"></td>
									</tr>
								</tbody>
							</table>
						</div>

						<bPanel>
							<h4 slot="title">月度放款情况</h4>
							<div slot="body">
								<div id="loan1" style="width:70%;height:450px;float:left"></div> 
								<img id="img5" src="../../assets/img/empty.png" style="width:70%;height:350px;float:left;display:none"/> 
								<div style="width:30%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>年月</th>
												<th>放款金额（万元）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list3" >
												<td v-text="item.monthly" v-bind:class="item.monthly ? 'link':''" v-on:click="getDList1(item.monthly)"></td>
												<td v-text="item.loan"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>

					</div>


					<div class="tab-pane fade" id="guaranteeProject" style="padding-top:20px;">
						<div id="principal2" style="width:50%;height:400px;float:left"></div> 
						<img id="img3" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
						<div id="interest2" style="width:50%;height:400px;float:left"></div> 
						<img id="img4" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
						<div style="table-layout:fixed;clear:both" >
							<table class="table table-bordered table-hover" >
								<thead>
									<tr>
										<th>项目类型</th>
										<th>年月</th>
										<th>预计归还本金（万元）</th>
										<th>实际归还本金（万元）</th>
										<th>差额本金（万元）</th>
										<th>预计归还利息（元）</th>
										<th>实际归还利息（元）</th>
										<th>差额利息（元）</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in list2" >
										<td v-text="item.projectType"></td>
										<td v-text="item.atime" class="link" v-on:click="getDList(item.atime)" ></td>
										<td v-text="item.planRepayPrincipal"  ></td>
										<td v-text="item.actualRepayPrincipal"></td>
										<td v-text="item.diffPrincipal"></td>
										<td v-text="item.planRepayInterest"></td>
										<td v-text="item.actualRepayInterest"></td>
										<td v-text="item.diffInterest"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<bPanel>
							<h4 slot="title">月度放款情况</h4>
							<div slot="body">
								<div id="loan2" style="width:70%;height:450px;float:left"></div> 
								<img id="img6" src="../../assets/img/empty.png" style="width:70%;height:350px;float:left;display:none"/> 
								<div style="width:30%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>年月</th>
												<th>放款金额（万元）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list4" >
												<td v-text="item.monthly" class="link" v-on:click="getDList1(item.monthly)"></td>
												<td v-text="item.loan"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
					</div>
				</div>
			</div>
			<modal >
				<h4 slot="titles" v-text="月度放款详细"></h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>项目类型</th>
								<th>放款时间</th>
								<th>项目名称</th>
								<th>融资交易方</th>
								<th>授信额度（万）</th>
								<th>放款总额（万）</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist">
								<td v-text="item.projectType"></td>
								<td v-text="item.atime ? getDate(item.atime):''"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.financing"></td>
								<td v-text="item.creditLine"></td>
								<td v-text="item.total"></td>
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
				type:1,
				principal:[],
				interest:[],
				loan:[],
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
		            	self.principal[1]= echarts.init(document.getElementById('principal2'),'macarons');
		            	self.interest[1]= echarts.init(document.getElementById('interest2'),'macarons');
		            	self.loan[1]=echarts.init(document.getElementById('loan2'),'macarons');
		            }
		            self.init();
	            })
	            //保理项目授信额度占比
				self.principal[0]= echarts.init(document.getElementById('principal1'),'roma');
				self.interest[0]= echarts.init(document.getElementById('interest1'),'roma');
				self.loan[0]=echarts.init(document.getElementById('loan1'),'roma');
				if(!self.$route.query.start){
					self.init();
				}
			});
			if(self.$route.query.type == 2 ){
				$('a[data-toggle="tab"][href="#guaranteeProject"]').click();	
			}
			if(self.$route.query.start){
				self.start = self.$route.query.start ;
				self.getEnd();
				self.getData();
			}
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num);
			},
			init(){
				this.start = new Date().getFullYear()+'-01';
				this.end = new Date().getFullYear()+'-12';
				this.getData();
			},
			getEnd(){
				if(this.start){
					var _times = this.start.split('-');
					var _end = [] ;
					if(_times[1]=='01'){
						_end[0] = _times[0];
						_end[1] = '12';
					}else{
						_end[0] = _times[0]-0+1;
						if(_times[1]<11){
							_end[1] = '0'+(_times[1]-1)
						}else{
							_end[1] =_times[1]-1;
						}
					}
					this.end = _end.join('-');
				}
			},
			getData(){
				var self = this ;
				var _start = self.start.split('-');
				var _end = self.end.split('-');
				//开始日 今年的一月一号
				var start = $api.getLong($api.dateFormat(new Date().setFullYear(_start[0],_start[1]-1,1)))/1000;
				//结束日 当前月的最后一天
				var end =$api.getLong($api.dateFormat(new Date().setFullYear(_end[0],_end[1],1)-86400000))/1000;
				/*
				 * 月度归还本息
				 */
				$api.ajax('/baoliyun/report/getReportToPrincipalMonthly',{
					projectType : self.type ,
					start : start ,
					end : end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#principal1').show();
						$('#img1').hide();
						$('#interest1').show();
						$('#img2').hide();
						self.list1 = _data ;
					}else{
						$('#principal2').show();
						$('#img3').hide();
						$('#interest2').show();
						$('#img4').hide();
						self.list2 = _data ;
					}
					var list1=[],list2=[],list3=[],list4=[],list5=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].atime);
						list2.push(_data[i].planRepayPrincipal);
						list3.push(_data[i].actualRepayPrincipal);
						list4.push(_data[i].planRepayInterest);
						list5.push(_data[i].actualRepayInterest);
					}
					var myObj1 = {
						title:{
							show:true,
							text:'月度归还本金情况'
						},
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['预计归还本金','实际归还本金']
					    },
					    grid:{
					    	height:'65%',
					    	width:'80%',
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
					self.principal[self.type-1].setOption(myObj1) ;	

					var myObj2 = {
						title:{
							show:true,
							text:'月度归还利息情况'
						},
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['预计归还利息','实际归还利息']
					    },
					    grid:{
					    	height:'65%',
					    	width:'80%',
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

					self.interest[self.type-1].setOption(myObj2) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						self.list1 = [];
						$('#principal1').hide();
						$('#img1').show();
						$('#interest1').hide();
						$('#img2').show();
					}else{
						self.list2 =[] ;
						$('#principal2').hide();
						$('#img3').show();
						$('#interest2').hide();
						$('#img4').show();
					}
				})


				//月度放款情况
				$api.ajax('/baoliyun/report/getReportToLoanMonthly',{
					projectType : self.type ,
					start : start ,
					end : end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#loan1').show();
						$('#img5').hide();
						self.list3 = _data ;
					}else{
						$('#loan2').show();
						$('#img6').hide();
						self.list4 = _data ;
					}
					var list1=[],list2=[] ,list3=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length;i++){
						list1.push(_data[i].monthly);
						list2.push(_data[i].loan);
					}
					var myObj = {
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['放款金额']
					    },
					    grid:{
					    	height:'65%',
					    	width:'70%',
					    	left:'20%',
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
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value}万'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'放款金额',
					            type:'bar',
					            data:list2,
					            barWidth:'35%'
					        }
					    ]
					}
					self.loan[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						$('#loan1').hide();
						$('#img5').show();
						self.list3 = [] ;
					}else{
						$('#loan2').hide();
						$('#img6').show();
						self.list4 = [] ;
					}
				})
			},
			getDList(time){
				if(time){
					this.$router.push({
						path:'/daysCapital',
						query:{
							time:time,
							type:this.type,
							start:this.start
						}
					})
				}
			},
			getDList1(time){
				var self = this ;
				if(time){
					$api.ajax('/baoliyun/report/getReportToLoanMonthlyDetail',{
						projectType:self.type,
						monthly:time
					},function(data){
						self.dlist = data.obj ;
						$('#myModal').modal({backdrop: 'static', keyboard: false}); 
					},function(data){
						toast.err(data.msg);
					})
				}
			}
		}

	}
</script>