<template>
      <input ref='dateinput' type="date" class="form-control" v-bind:value="svalue(value)" v-on:input="uvalue($event.target.value)" />
</template>
<script type="text/javascript">

    export default{
    	props:['value'],
        methods:{
        	svalue(value){
        		if(value) {
					return $api.dateFormat(value);
				}else{
					return '';
				}
        	},
        	uvalue(value){
                var _val = value.split('-');
                if(value && _val[0]>=1970){
                    this.$emit('input',$api.getLong(value));
                }
        	}
        }
    }

</script>