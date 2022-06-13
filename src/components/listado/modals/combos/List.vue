<template>
<div>
	<b-table
	v-if="combos.length"
	head-variant="dark"
	:fields="fields"
	:items="items">
		<template #cell(options)="data">
			<b-button
			v-if="selected_articles.length"
			class="m-r-10"
			variant="primary"
			size="sm"
			@click="add(combos[data.index])">
				<btn-loader
				:loader="adding"
				:index="combos[data.index].id"
				text="Agregar"></btn-loader>
			</b-button>
			<b-button
			class="m-r-10"
			variant="primary"
			size="sm"
			@click="editModel(combos[data.index])">
				<i class="icon-edit"></i>
			</b-button>
			<b-button
			variant="danger"
			size="sm"
			@click="deleteModel(combos[data.index])">
				<i class="icon-trash"></i>
			</b-button>
		</template>
	</b-table>
	<p 
	v-else
	class="text-with-icon">
		<i class="icon-eye-slash"></i>
		No hay combos 
	</p>
</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import mixin from '@/mixins/combos'
export default {
	mixins: [mixin],
	components: {
		BtnLoader,
	},
	data() {
		return {
			adding: 0,
		}
	},
	computed: {
		fields() {
			return [
				{ key: 'name', label: 'Nombre', sortable: true, class: 'text-center' },
				{ key: 'articles', label: 'Articulos', sortable: true, class: 'text-center'},
				{ key: 'price', label: 'Precio', sortable: true, class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.combos.forEach(combo => {
				items.push({
					name: combo.name,
					articles: combo.articles.length,
					price: this.price(combo.price),
				})
			})
			return items
		},
	},
	methods: {
		add(combo) {
			this.adding = combo.id
			this.$api.put('combos/'+combo.id, {
				...combo,
				articles: this.selected_articles
			})
			.then(res => {
				this.adding = 0
				this.$store.commit('combos/update', res.data.combo)
				this.$toast.success('Combo actualizado')
			})
			.catch(err => {
				this.adding = 0
				console.log(err)
				this.$toast.error('Error al actualizar combo')
			})
		},
		editModel(combo) {
			this.$store.commit('combos/setEdit', combo)
			this.$bvModal.show('edit-combo')
		},
		deleteModel(combo) {
			this.$store.commit('combos/setDelete', combo)
			this.$bvModal.show('delete-combo')
		}
	}
}
</script>