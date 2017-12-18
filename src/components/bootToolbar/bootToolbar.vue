<template>
	<div id="toolbar" class="btn-group pull-right">
        <slot></slot>
        <button  id="btn_edit" type="button" class="btn btn-default" v-on:click="edit(2)" style=" border-radius: 0;display:none;" v-bind:allow="allows">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>修改
        </button>
        <button  id="btn_delete" type="button" class="btn btn-default" style="display:none" v-bind:allow="allow2 ? allow2 :allows ">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
        </button>
        <button id="btn_add" type="button" class="btn btn-default" v-bind:allow="allow2 ? allow2 :allows " v-on:click="edit(1)" >
            <span class="glyphicon glyphicon-plus" aria-hidden="true"  ></span>新增
        </button>
	</div>
</template>
<script type="text/javascript">  
    export default{
        data () {
            return {      		
            }
        },
        props:['allows','allow2'] ,
        mounted(){
            $api.checkAllow();
        },
        methods:{
        	edit (num){
        		this.$emit('editEven',num);
        	}
        }
    }
</script>