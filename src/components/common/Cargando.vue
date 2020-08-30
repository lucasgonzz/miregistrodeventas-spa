<template>
<b-row v-show="is_loading || is_loading_2 || is_loading_3">
	<b-col :class="'col-loader-'+size">
		<div :class="'loader '+size">Loading...</div>
	</b-col>
</b-row>
</template>
<script>
export default {
	props: ['is_loading', 'is_loading_2', 'is_loading_3', 'size']
}
</script>
<style scoped>
.row {
  margin-top: 1em;
}
.col-loader-md {
	min-height: 300px;
}
.col-loader-sm {
	min-height: 100px;
}
.loader,
.loader:before,
.loader:after {
  background: #007bff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #007bff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.md {
  margin: 88px auto !important;
}
.sm {
  margin: 20px auto !important;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

</style>