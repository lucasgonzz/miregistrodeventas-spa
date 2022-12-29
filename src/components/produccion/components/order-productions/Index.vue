<template>
	<div
	v-if="view == 'ordenes-de-produccion'">

		<view-component 
		@modelSaved="modelSaved" 
		:models_to_show="models_to_show"
		show_filter_modal
		show_btn_pdf
		model_name="order_production"
		check_can_create>
			<template #modals>
				<order-production-status></order-production-status>
				<finish></finish>	
			</template>
			
			<template #modal_buttons>
				<modal-buttons></modal-buttons>
			</template>

			<template #horizontal_nav_buttons>
				<b-button
				class="m-l-15"
				variant="primary"
				v-b-modal="'order_production_statuses'">
					Estados
				</b-button>
			</template>

			<!-- <template v-slot:default="props">
				<btn-activate-article
				:model="props.model"></btn-activate-article>
			</template> -->
		</view-component>
	</div>
</template>
<script>
import OrderProductionStatus from '@/components/produccion/components/order-productions/OrderProductionStatus'
import Finish from '@/components/produccion/modals/order-productions/Finish'

import ViewComponent from '@/components/common/view/Index'
import ModalButtons from '@/components/produccion/components/order-productions/ModalButtons'
import BtnActivateArticle from '@/components/common/BtnActivateArticle'
export default {
	components: {
		OrderProductionStatus,
		Finish,
		
		ViewComponent,
		ModalButtons,
		BtnActivateArticle,
	},
	computed: {
		models_to_show() {
			if (!this.is_owner) {
				let models = []
				let articles = []
				let order_production_has_articles = false 
				this.models.forEach(order_production => {
					order_production.articles.forEach(article => {
						if (article.pivot.employee_id == this.user.id) {
							console.log('agregando el articulo '+article.name)
							articles.push(article)
							order_production_has_articles = true 
						}
					})
					if (order_production_has_articles) {
						order_production.articles = articles
						models.push(order_production)
						order_production_has_articles = false 
						articles = []
					}
				})
				return models 
			}
			return []
		},
		models() {
			return this.$store.state.order_production.models
		}
	},
	methods: {
		modelSaved(model) {
			if (model.client_id) {
				this.loadModel('client', model.client_id)
			}
		}
	}
}
</script>