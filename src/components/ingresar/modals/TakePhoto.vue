<template>
	<div class="modal fade" id="take-photo">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5>
						<strong>
							<i class="icon-camera"></i>
							Tomar foto
						</strong>
					</h5>
					<button class="close" data-dismiss="modal">
						<i class="icon-close"></i>
					</button>
				</div>
				<div class="modal-body">
					<video autoplay>Start streaming</video>
					<!-- <video id="v" width="300" height="300"></video>
					<input id="b" type="button" disabled="true" value="Take Picture"></input>
					<canvas id="c" style="display:none;" width="300" height="300"></canvas> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['start_video'],
	watch: {
		start_video() {
			if (this.start_video) {
				this.showVideo()
			} 
		},
	},
	methods: {
	}
}
</script>