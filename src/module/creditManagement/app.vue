<template>
	<div id="app">
		<div class="tableBody">
			<bSearch ref="cSear" type="1" @searEvent ="searEvent" :creditMainPartyArr='creditMainPartyArr' ></bSearch>
			<div style="margin:0 auto;width:96%">
				<bTable @getList="getList" ></bTable>
				<bToolbar @editEven="editEven" allows='creditEdit'>
					<button  id="btn_info" type="button" class="btn btn-default" v-on:click="editEven(2)" style=" border-radius: 0;display:none;" allow="sxzjllook">查看
        			</button>
				</bToolbar>		  	
			</div>
		</div>	
		<editBody :creditMainPartyArr="creditMainPartyArr" ref="cEdit" @refresh="searEvent" allows="creditEdit" ></editBody>
		<addMParty @getArr="getArr" ></addMParty>
	</div>
</template>
<script type="text/javascript" >
	import bSearch from '../../components/bootSearch/bootSearch.vue'
	import bTable  from '../../components/bootTable/bootTable.vue'
	import bToolbar from '../../components/bootToolbar/bootToolbar.vue'
	import editBody from '../../components/editBody/editBody.vue'
	import addMParty from '../../components/addMainParty/addMainParty.vue'
	export default {
		name :'app',
		data () {
			return {
				creditMainPartyArr:$api.cMPArr()
			}
		},
		components:{
			bSearch,
			bTable,
			bToolbar,
			editBody,
			addMParty
		},
		methods:{
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//表格数据信息
			getList (){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl+"/baoliyun/guarantee/getFactoringCompanyCreditList",
			    	queryParams:function(params){
			    		return{
			    			factoringCompanyId:$api.getUserInfo().affiliatedFactoringEnterpriseId,
			    			creditMainPartyId:self.$refs.cSear.creditMainParty,
			        		pageSize: params.limit,
			        		pageIndex:params.pageNumber
			        	}
			        },
					columns:[
			        	{
			        		title:'全选',
			        		field:'select',
			        		radio:true,
			        		width:25,
			        		align:'center',
			        		valign:'middle'
			        	},
			        	{
			        		title:'授信ID',
			        		field:'id',
			        	},
			        	{
			        		title:'保理公司名称',
			        		field:'factoringCompanyName'
			        	},
			        	{
			        		title:'放款主体名称',
			        		field:'creditMainPartyName'
			        	},
			        	{
			        		title:'授信额度(元)',
			        		field:'creditLine'
			        	},
			        	{
			        		title:'授信币种',
			        		field:'creditCurrent',
			        		formatter: value => value==1 ? '人民币' : value == 2 ? '美元' : '-'
			        	},
			        	{
		        			title:'授信期限',
		        			field:'creditTerm'
			        	},
			        	{
			        		title:'授信期限单位',
			        		field:'creditTermUnit',
			        		formatter:value => value==1 ? '年' : value == 2 ? '月' : value == 3 ? '日' : '-'
			        	},
			        	{
			        		title:'开始时间',
			        		field:'creditBeginDay',
			        		formatter:$api.dateFormat
			        	},
			        	{
			        		title:'结束时间',
			        		field:'creditEndDay',
			        		formatter:$api.dateFormat
			        	},
			        	{
			        		title:'状态',
			        		field:'creditStatus',
			        		formatter:value => value==1 ? '未申请' : value == 2 ? '已申请' : value == 3 ? '已到期' : '-'
			        	},
			        	{
			        		title:'保证金支付方式',
			        		field:'depositPayWays',
			        		formatter:value => value==1 ? '不支付' : value == 2 ? '一次性支付' : value == 3 ? '按放款单位支付' : '-'
			        	},
			        	{
			        		title:'保证金担付方',
			        		field:'depositPayer',
			        		formatter: value => value==1 ? '企业' : value == 2 ? '保理公司' : '-'
			        	}
			    	],
			    	onRefreshOptions(){
				    	$('#btn_edit').css('display','none');
						$('#btn_delete').css('display','none');
						$('#btn_info').css('display','none');
			    	},
			    	onRefresh(){
				    	$('#btn_edit').css('display','none');
						$('#btn_delete').css('display','none');
						$('#btn_info').css('display','none');
			    	}
				})
				$api.editBtnAni('#mytab');
				$api.delEven('#mytab','/baoliyun/guarantee/delFactoringCompanyCredit');	    
			},
			getArr(){
				this.creditMainPartyArr = $api.cMPArr() ;
			},
			//新增/修改按钮
			editEven(num){
				if(!this.creditMainPartyArr.length)
				this.creditMainPartyArr = this.$refs.cSear.creditMainPartyArr;
				var _id = -1;
				if(num == 2){
					_id=$('#mytab').bootstrapTable('getSelections')[0].id;
				}
				this.$refs.cEdit.getInfo(_id);
				$api.editAni();
			}
		}
	}
</script>
<style>
    .help-block{
   		text-align:right;
    }
</style>