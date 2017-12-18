<template>
  	<table id="mytab" class="table table-hover" v-on:change="showEven"></table>	  	
</template>
<script type="text/javascript">
    export default{
        data:function(){
            return {               
            }
        },
        mounted(){
        	this.$emit('getList');      	
        },
        methods:{
            showEven(){
                this.$emit('showEven')
            }
        }
    }

</script>
<style lang="less">

</style>