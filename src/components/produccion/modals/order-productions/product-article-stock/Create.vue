<template>
<b-modal
id="create-product-article-stock"
title="Nuevo descuento de stock"
hide-footer>
    <b-form-group
    label="Articulo">
        <select-component
        id="article-bar-code"
        :model="form.article"
        :models="articles"
        :props_to_filter="['bar_code', 'name', 'provider_code', 'num']"
        :str_limint="2"
        prop_name="name"
        placeholder="Buscar articulo"
        :props_to_show="['bar_code', 'price', 'provider_code', 'num']"
        auto_select
        @setSelected="setSelected"></select-component>
    </b-form-group>
    <b-form-group
    v-if="article_selected"
    label="Articulo seleccionado">
        <article-card
        :article="form.article"></article-card>
    </b-form-group>
    <b-form-group
    label="Cantidad">
        <b-form-input
        type="number"
        min="1"
        placeholder="Ingrese cuantas unidades se van a descontar"
        v-model="form.amount"></b-form-input> 
    </b-form-group>
	<b-form-group
	label="Nota">
		<b-form-textarea
		placeholder="Ingrese una nota sobre las unidades que se van a descontar"
		v-model="form.note"></b-form-textarea>
	</b-form-group>
	<b-form-group
    label="Fecha">
        <b-form-checkbox
        :value="true"
        :unchecked-value="false"
        v-model="form.current_date">
            Dia de hoy
        </b-form-checkbox>
        <b-form-datepicker
        class="m-t-10"
        placeholder="Ingrese la fecha en la que se hizo el descuento de stock"
        v-if="!form.current_date"
        v-model="form.created_at">
        </b-form-datepicker>
    </b-form-group>
    <b-button
    @click="save"
    block
    variant="primary">
    	<btn-loader
    	text="Guardar"
    	:loader="loading"></btn-loader>
    </b-button>
</b-modal>
</template>
<script>
import product_article_stocks from '@/mixins/product_article_stocks'

import ArticleCard from '@/components/common/ArticleCard'
import BtnLoader from '@/components/common/BtnLoader'
import BtnCreate from '@/components/produccion/modals/order-productions/product-delivery/BtnCreate'
import List from '@/components/produccion/modals/order-productions/product-delivery/List'
import SelectComponent from '@/components/common/select/Index'
export default {
	mixins: [product_article_stocks],
	components: {
        ArticleCard,
		BtnLoader,
		BtnCreate,
		List,
        SelectComponent,
	},
    computed: {
        articles() {
            return this.$store.state.articles.articles
        },
    },
	data() {
        return {
        	form: {
                article: {
                    name: '',
                    bar_code: '',
                    provider_code: '',
                    num: '',
                },
                amount: '',
                note: '',
                current_date: true,
                created_at: '',
            },
            article_selected: false,
        	loading: false,
        }
    },
    methods: {
        setSelected(article) {
            this.form.article = article
            this.article_selected = true
        },
    	save() {
    		if (this.check()) {
    			this.loading = true 
    			this.$api.post('budget-product-article-stocks', {
    				...this.form,
    				product_id: this.product.id,
    			})
    			.then(res => {
    				this.loading = false 
    				this.$toast.success('Descuento de stock guardado')
                    this.product.article_stocks.push(res.data.budget_product_article_stock)
                    this.$store.commit('articles/update', res.data.article)
    				this.$bvModal.hide('create-product-article-stock')
    				this.clear()
    			})
    			.catch(err => {
    				this.loading = false
    				console.log(err)
    			})
    		}
    	},
    	check() {
            if (this.form.amount == '') {
                this.$toast.error('Ingrese la cantidad')
                return false
            }
    		return true
    	},
    	clear() {
            this.selected_article = false
    		this.form = {
                article: {
                    name: '',
                    bar_code: '',
                    provider_code: '',
                    num: '',
                },
                amount: '',
                note: '',
                current_date: true,
                created_at: '',
            }
    	}
    }
}
</script>