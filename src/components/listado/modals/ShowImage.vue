<template>
	<div class="modal fade" id="show-image">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5>
						<i class="icon-camera"></i>
						{{ article.name }}
					</h5>
					<button class="close" data-dismiss="modal">
						<i class="icon-cancel"></i>
					</button>
				</div>
				<div class="modal-body">
					<img v-if="user && article.image" :src="getImageName()" :alt="article.name">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['article', 'user'],
	data() {
		return {
			image_name: '',
		}
	},
	methods: {
		getImageName() {
			return this.api_url + 'images/articles/' + this.user.id + '/' + this.article.image
		}
	}
}
</script>
<style scoped>
img {
	max-width: 100%;
}
</style>