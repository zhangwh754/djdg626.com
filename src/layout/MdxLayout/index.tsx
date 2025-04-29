// import { CodeBlock } from './CodeBlock'
import { CodeBlock } from './code-block'
import Icon from '@/components/SiteIcon'
import { Heading1, Heading2, Heading3, HeadingSmall } from './HeadingTags'
import Alert from '@/components/SiteAlert'
import DocumentViewer from '@/components/DocumentViewer'
import WaterFall from '@/components/SiteWaterFall'
import ImgBlock from './ImgBlock'

export const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: HeadingSmall,
  h5: HeadingSmall,
  h6: HeadingSmall,
  p: (props: any) => (
    <div {...props} className="my-4 leading-7">
      {props.children}
    </div>
  ),
  code: (props: any) => (
    <code {...props} className="mx-2 py-1 px-2 bg-neutral text-neutral-content rounded-md transition-colors">
      {props.children}
    </code>
  ),
  ul: (props: any) => {
    if (props.className === 'contains-task-list') {
      const taskListItem = props.children.filter((item: any) => item.props).map((item: any) => item.props.children)

      return (
        <ul {...props} className="my-4 text-2xl">
          {taskListItem.map((item: any, index: number) => (
            <li
              key={index}
              className="flex items-center [&>input]:mr-2 [&>input]:checkbox [&>input]:checkbox-md [&>input]:checkbox-success [&>input:disabled]:bg-[initial] [&>input:disabled]:border-[#00d7c0] [&>input:disabled]:opacity-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <ul {...props} className="my-4 pl-5 [&>li]:list-disc">
          {props.children}
        </ul>
      )
    }
  },
  ol: (props: any) => (
    <ol {...props} className="my-4 pl-5 [&>li]:list-decimal">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="[&>ul]:my-1 [&>ol]:my-1">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <a {...props} className="px-2 text-success" target="_blank">
      <span className="pr-2">{props.children}</span>
      <Icon name="link" className="inline-block w-4 h-4" />
    </a>
  ),
  pre: pre,
  table: (props: any) => {
    return <table className="table [&>thead]:text-inherit">{props.children}</table>
  },
  Alert: Alert,
  DocumentViewer: DocumentViewer,
  WaterFall: WaterFall,
  img: ImgBlock,
}

function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  return <CodeBlock>{children}</CodeBlock>
}

export default mdxComponents
