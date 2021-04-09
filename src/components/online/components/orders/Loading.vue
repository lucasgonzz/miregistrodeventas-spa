<template>
	<div>
		<div
		v-for="i in 10"
		:key="i">
			<b-skeleton width="85%"></b-skeleton>
			<b-skeleton width="85%"></b-skeleton>
		</div>
	</div>
</template>