<template>
	<transition :name="transitionName">
        <router-view></router-view>
    </transition>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				transitionName:''
			}
		},
		watch: {
		  '$route' (to, from) {
		    const toDepth = to.path.split('/').length
		    const fromDepth = from.path.split('/').length
		    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		  }
		}
	}
</script>