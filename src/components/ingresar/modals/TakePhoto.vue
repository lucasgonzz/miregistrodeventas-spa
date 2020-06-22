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
		async showVideo() {
				navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
				if (navigator.mediaDevices.getUserMedia) {
					navigator.mediaDevices.getUserMedia({  audio: true, video: true })
					.then(function (stream) {
						//Display the video stream in the video object

						document.querySelector('video').srcObject = stream

					})
					.catch(function (e) { logError(e.name + ": " + e.message); });
				} else {
					navigator.getWebcam({ audio: true, video: true }, 
					function (stream) {
						//Display the video stream in the video object
						document.querySelector('video').srcObject = stream
					}, 
					function () { logError("Web cam is not accessible."); });
				}
				// const stream = await navigator.mediaDevices.getUserMedia({
				//     video: true
				// })
				// document.querySelector('video').srcObject = stream

				// navigator.mediaDevices.getUserMedia({video: true}, function(stream) {
				// 	var video = document.getElementById("v");
				// 	var canvas = document.getElementById("c");
				// 	var button = document.getElementById("b");

				// 	video.src = stream;
				// 	button.disabled = false;
				// 	button.onclick = function() {
				// 		canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
				// 		var img = canvas.toDataURL("image/png");
				// 		alert("done");
				// 	};
				// }, function(err) { alert("there was an error " + err)});
				// } catch(e) {
				// 	console.error(e)
				// }
		}
	}
}
</script>