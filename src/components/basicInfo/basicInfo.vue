<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4>项目基本信息</h4>
		</div>
		<div class="panel-body">
			<div class="form-group">
				<label class="fLabel" >项目编号</label>
				<span class="col-sm-2">{{saveInfo.projectNumber}}</span>
			</div>
			<div class="form-group">
				<label class="fLabel">项目名称★</label>
				<div class="col-sm-6">
					<input type="text" class="form-control" name="projectName" v-model="saveInfo.projectName"/>
				</div>
			</div>
		</div>
	</div>
</template>