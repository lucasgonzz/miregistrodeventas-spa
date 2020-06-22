import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor(user) {
	const { can, cannot, build } = new AbilityBuilder(Ability);
	
	if (user.owner_id == null) {
		can('manage', 'all'); // read-write access to everything
	} else {
		if (user.permissions)
		can('read', 'all') // read-only access to everything
	}

	cannot('delete', 'Post', { published: true });

	return build();
}