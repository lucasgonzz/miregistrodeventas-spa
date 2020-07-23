<template>
<b-modal id="commerces-in-use" :title="`Commercios en uso de ${admin.name}`" hide-footer>
	<b-container fluid>
		<b-row>
			<b-col>
				<div class="table-responsive">
					<table class="table table-striped">
						<thead class="thead-dark">
							<tr>
								<th>Comercio</th>
								<th>Nombre</th>
								<th>Vence</th>
							</tr>
						</thead>
						<tbody>
							<tr
							v-for="commerce in admin.commerces_in_use"
							:key="commerce.id">
								<td>
									{{ commerce.name }}
								</td>
								<td>
									{{ commerce.company_name }}
								</td>
								<td>
									{{ date(commerce.expire) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
export default {
	props: ['admin']
}
</script>		