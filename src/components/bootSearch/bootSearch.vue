<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			查询条件
		</div>
		<div class="panel-body">
        	<button class="btn btn-primary pull-right" v-on:click="searFun">查询</button>
            <div class="pull-right form-group" v-if="type&1">
                <select  class="form-control" v-model="creditMainParty">
                	<option value='-1'>放款主体名称</option>
				   	<option v-for="item in creditMainPartyArr" v-bind:value="item.id">{{ item.creditMainPartyName}}</option>
				</select>
            </div>
            <div class="pull-right form-group" v-if="type&2">
            	<select class="form-control" v-model="creditProject">
            		<option value='-1'>担保项目名称</option>
            		<option v-for="item in creditProjectArr" v-bind:value="item.id">{{ item.guaranteeProjectName }}</option>
            	</select>
            </div>
            <div class="pull-right form-group" v-if="type&4">
            	<select class="form-control" v-model="company">
            		<option value='-1'>融资企业名称</option>
            		<option v-for="item in companyArr" v-bind:value="item.id">{{ item.companyName }}</option>
            	</select>
            </div>
		</div>
	</div>
</template>
<script type="text/javascript">  
    export default{
        data () {
            return {
                creditMainParty:-1,
                creditProject:-1,
                company:-1
            }
        },
        props:['type','creditMainPartyArr','creditProjectArr','companyArr'],
        methods:{
            searFun (){
                this.$emit('searEvent');
            }
        }
    }

</script>
<style lang="less" scoped>
	.panel{
		margin-bottom:0px;	
        .panel-body{
            .btn {
                width:100px;
            }
            .form-group {
                margin-right:20px; 
                .form-control{
                    font-size:14px;
                    height:34px;
                    width:160px;
                }   
            }
        }        
	}     
</style>