<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import PageHeader from '$lib/components/Text/PageHeader.svelte';
	import { pools } from '$lib/config/constants/pools';
	import { darkMode } from '$lib/stores/dark';
</script>

<section class="background {$darkMode && 'background__dark'}">
	<PageHeader text={$_('headers.pools.text')} />
	<div class=" mt-5 space-y-4 ">
		<div
			class="mx-auto flex max-w-7xl flex-row flex-wrap justify-center gap-y-9 gap-x-6 p-3 text-center md:p-6 ">
			{#each pools as pool}
				<PoolCard info={pool} />
			{/each}
		</div>
	</div>
</section>

<style>
	.background {
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;

		background-image: url('/theme/pools/fantasyMushCity.webp');
	}
	.background__dark {
		background-image: url('/theme/pools/mushVillageDark.webp');
		background-size: cover;
		background-position: center center;
	}
</style>
