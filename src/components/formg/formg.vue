<template>
	<div class="form-group formg">
		<label class="fLabel"><slot name="tl"></slot></label>
		<div class="formInput">
			<slot name="ct"></slot>
		</div>
		<slot name="ct1" ></slot>
	</div>
</template>
<script type="text/javascript">
	export default{

	}
</script>
<style lang="less">
	.formg{
        float:left;
        display:inline-block;
        margin-right: 0px;
        margin-left: 0px;
        .help-block{
	   		text-align: right;
	    }
        input[type=radio]{
       		float:left;
       		display:inline-block;
       		margin-top:10px;
       		margin-right:5px;
       }
       .fLabel{
	   		width:150px;
	    }
	    .formInput{
	    	float:left;
	       	display:inline-block;
	       	margin-left:10px;
	       	span,p{
				padding-top:7px;
				display:inline-block;
				width:180px;
	       	}
			select,input{
				width:180px;
			}
			textarea{
				width:700px;
				height:120px;
				resize:none;
			}
			.uplodeComponent{
				.imgShow{
			    	width:100%;
			    	margin-left:0;
			    	width:700px;
				}
		    }
	    }
    }			
</style>