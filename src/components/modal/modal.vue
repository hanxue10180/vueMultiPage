<template>
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <slot name="titles"></slot>
	            </div>
	            <div class="modal-body">
	            	<slot name="bodys"></slot>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	                <slot name="btn"></slot>
	            </div>
	        </div>
	    </div>
	</div> 
</template>
<script type="text/javascript">
	export default{
	}
</script>