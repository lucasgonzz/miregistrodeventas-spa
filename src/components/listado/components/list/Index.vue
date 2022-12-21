<template>
<div>
	<display
	model_name="article">
		<template v-slot:buttons="props">
			<buttons :model="props.model"></buttons>
		</template>
	</display>
</div>
</template>
<script>
import Display from '@/components/common/display/Index'
import Buttons from '@/components/listado/components/list/Buttons'

import edit_articles from '@/mixins/edit_articles'
export default {
	mixins: [edit_articles],
	components: {
		Display,
		Buttons,
	}
}
</script>