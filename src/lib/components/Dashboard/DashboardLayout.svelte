<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
</script>

<div class="background {$darkMode && 'background__dark'}">
	<div class=" mx-auto   max-w-screen-xl  px-2 pt-10">
		<slot />
	</div>
</div>

<style>
	.background {
		background-image: url('/theme/dashboard/dashboardMush.webp');
		background-size: contain;
	}

	.background__dark {
		background-image: url('/theme/dashboard/darkDashboardMush.webp');
		background-size: contain;
	}
</style>
