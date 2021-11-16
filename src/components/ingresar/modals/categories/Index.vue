<template>
<b-modal 
id="categories" 
title="Categorias" 
body-class="p-0"
hide-footer>
	<categories-nav></categories-nav>
	<list></list>
</b-modal>
</template>
<script>
import CategoriesNav from '@/components/ingresar/modals/categories/Nav'
import List from '@/components/ingresar/modals/categories/List'
export default {
	components: {
		CategoriesNav,
		List,
	}
}
</script>