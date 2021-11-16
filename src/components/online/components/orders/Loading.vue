<template>
	<ul 
	class="horizontal-ul">
		<li
		v-for="i in 3"
		:key="i">
			<div
			class="order-card border-radius-1 shadow-2">
				<div class="card-body">
					<b-skeleton 
					class="m-b-20"
					width="100%"></b-skeleton>
					<hr>
					<b-skeleton 
					class="m-b-20"
					width="70%"></b-skeleton>
					<b-skeleton 
					class="m-b-20"
					width="70%"></b-skeleton>
					<b-skeleton 
					class="m-b-20"
					width="70%"></b-skeleton>
					<b-skeleton 
					class="m-b-20"
					width="70%"></b-skeleton> 
				</div>
			</div>
		</li>
	</ul>
</template>