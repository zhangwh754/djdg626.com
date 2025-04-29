import Icon from '../SiteIcon'
import SiteTags from '../SiteTags'

function SiteCategorySection() {
  return (
    <>
      <div className="px-4 py-6 bg-base-100 shadow-md rounded-lg">
        <div className="mb-2 flex items-center text-info [&>.icon]:cursor-default">
          <div>标签</div>
          <Icon name="menu" className="ml-3 w-4 h-4"></Icon>
        </div>

        <SiteTags />
      </div>
    </>
  )
}

export default function SiteSidebar() {
  return (
    <div className="hidden sm:block ml-4 lg:w-72 w-56">
      <SiteCategorySection />
    </div>
  )
}
