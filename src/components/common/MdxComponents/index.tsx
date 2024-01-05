import { CodeBlock } from './CodeBlock'
import Icon from '../SiteIcon'
import { Heading1, Heading2, Heading3, HeadingSmall } from './HeadingTags'

export const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: HeadingSmall,
  h5: HeadingSmall,
  h6: HeadingSmall,
  p: (props: any) => (
    <p {...props} className="my-4 leading-7">
      {props.children}
    </p>
  ),
  code: (props: any) => (
    <code
      {...props}
      className="mx-2 py-1 px-2 text-[#476582] bg-[#f6f6f7] dark:text-[#c9def1] dark:bg-[#313136] rounded-md transition-colors"
    >
      {props.children}
    </code>
  ),
  ul: (props: any) => {
    if (props.className === 'contains-task-list') {
      console.log('1111111111', props.children)

      return (
        <ul {...props} className="my-4 text-3xl [&>li>input]:w-6 [&>li>input]:h-6">
          <li>
            <span className='text-red-500'>{props.children}</span>
          </li>
        </ul>
      )
    } else {
      return (
        <ul {...props} className="my-4 pl-5 list-decimal">
          {props.children}
        </ul>
      )
    }
  },
  ol: (props: any) => (
    <ol {...props} className="my-4 pl-5 list-disc">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="[&>ul]:my-1 [&>ol]:my-1">
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <a {...props} className="px-2 text-green-600 dark:text-green-300" target="_blank">
      <span className="pr-2">{props.children}</span>
      <Icon name="link" className="inline-block w-4 h-4" />
    </a>
  ),
  pre: (props: any) => {
    const codeblock = (props.children.props.children as string).trim()
    const language = props.children.props.className

    return <CodeBlock codeBlock={codeblock} language={language} />
  },
  // input: (props: any) => {
  //   console.log(props)

  //   return <div>{props.children}</div>
  // },
  // table: (props: any) => {
  //   return <h2 className="text-red-500 text-5xl">Hello World</h2>
  // },
  MyComponent: (props: { num: number }) => (
    <div className="border">
      <h2>Title</h2>
      <p>Hello World! {props.num}</p>
    </div>
  ),
}

export default mdxComponents
