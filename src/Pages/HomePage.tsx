import { Page } from "../Components";

export function HomePage() {
	return <Page>
		<h1>Home</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor sagittis mi, laoreet ornare mi luctus vel. Pellentesque venenatis convallis neque congue convallis. Vivamus ut luctus ipsum, at blandit felis. Proin consequat nulla in tellus commodo, ac dictum eros tempor. Vestibulum lacinia nunc in eros malesuada egestas. In faucibus tincidunt volutpat. Donec eu dignissim ex. Donec sit amet quam eget diam eleifend luctus. Sed at metus vel orci volutpat eleifend vel vitae velit. Cras odio ipsum, sollicitudin a risus malesuada, aliquam semper felis. Fusce eget vehicula est. Ut ultrices id sem non vestibulum. Donec neque nunc, pretium sed tellus eget, consectetur egestas sem.</p>
		<p>Sed lacinia orci risus, vel molestie mi rutrum at. Sed ultricies pretium malesuada. Suspendisse posuere mi ut libero tempor, id posuere est mattis. Ut egestas eros eu mauris volutpat, quis scelerisque ante congue. Nullam ultrices eget ante sit amet congue. Integer venenatis sem quis nisi elementum, a facilisis lorem eleifend. Praesent eu fermentum ligula.</p>
		<p>Ut sed lorem vel mauris viverra mollis. Morbi nec nibh sed erat pretium condimentum non a purus. Curabitur massa sem, vulputate sed sapien nec, luctus tristique dolor. Mauris elementum nisi nec purus accumsan, a ullamcorper sem dignissim. Nam maximus faucibus ipsum. Integer suscipit sem nec porttitor tincidunt. Nunc cursus, arcu ac porta hendrerit, ante est ullamcorper enim, vel molestie mauris erat in odio. Donec sodales nisi quis tortor vulputate auctor. Integer tincidunt posuere tristique. In fermentum, urna ut commodo tincidunt, ex lectus lobortis libero, ut fermentum metus augue sit amet purus. Nullam vitae sollicitudin augue, et interdum nunc.</p>
		<p>Donec auctor imperdiet hendrerit. Morbi at metus vitae eros suscipit interdum quis vitae nunc. Curabitur sed neque et eros condimentum ullamcorper. Nunc lobortis dapibus eros, tempus fermentum justo semper eu. Nulla facilisi. In at imperdiet turpis. In eget accumsan orci. Ut orci elit, bibendum nec varius eget, ornare at mi. Donec eu diam turpis. Praesent sagittis dapibus leo, quis lobortis libero congue in. Proin interdum eget nibh eu rhoncus. Pellentesque ac scelerisque est, sit amet accumsan risus. Nam et eros turpis. Nam ipsum arcu, tempor eget lobortis non, rutrum ut ligula.</p>
		<p>Nullam sit amet interdum magna, vel convallis lectus. Duis tincidunt commodo eleifend. Nam sit amet ultrices eros. Donec consequat quam augue, id pretium diam congue nec. Fusce dapibus massa eu auctor volutpat. Vivamus vehicula accumsan urna id cursus. Vivamus consequat maximus libero id ullamcorper. Nunc sodales libero risus, at faucibus odio commodo sed. Nam nisl leo, eleifend at feugiat vitae, commodo at nisi. Aliquam condimentum arcu dui, suscipit rhoncus turpis viverra sit amet.</p>
	</Page>;
}

if (import.meta.env.DEV)
	HomePage.whydidyourender = true;

export default HomePage;