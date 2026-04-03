<script lang="ts">
	import { Chart, Bars, Axis } from 'layerchart';
	import { scaleBand, scaleLinear } from 'd3';

	type Bar = { label: string; value: number };
	type Props = { bars: Bar[]; color?: string };

	let { bars, color = '#f5a623' }: Props = $props();
</script>

<div class="h-24 w-full">
	<Chart
		data={bars}
		x="label"
		xScale={scaleBand().padding(0.3)}
		y="value"
		yScale={scaleLinear()}
		padding={{ top: 4, bottom: 16, left: 0, right: 0 }}
	>
		<Bars {color} radius={2} />
		<Axis placement="bottom" rule={false} tickLength={0}
			format={(d: string) => d}
			classes={{ tick: 'text-[9px] fill-gray-500' }} />
	</Chart>
</div>
