<template>
	<table class="table" style="width:600px;">
		<thead>
			<tr>
				<th>放款主体名称</th>
				<th>担保项目名称</th>
				<th>融资企业名称</th>
				<th>保证金支付方式</th>
				<th>授信金额（元）</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td v-text="cInfo.creditMainPartyName"></td>
				<td v-text="cInfo.creditProjectName"></td>
				<td v-text="cInfo.creditCompanyManageName"></td>
				<td v-text="cInfo.depositPayWays==1 ? '不支付' : cInfo.depositPayWays==2 ? '一次性支付' : cInfo.depositPayWays==3 ? '按放款单位支付' : '-' "></td>
				<td v-text="cInfo.creditGuaranteeLine"></td>
			</tr>
		</tbody>
	</table>
</template>
<script type="text/javascript">
	export default{
		props:['cInfo']
	}
</script>