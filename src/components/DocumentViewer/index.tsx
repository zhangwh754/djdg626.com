import React from 'react'

interface DocumentViewerProps {
  filePath: string
  fileType: 'pdf' | 'word'
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ filePath, fileType }) => {
  // 对于 PDF 文件，我们可以直接使用浏览器内置的 PDF 查看器
  if (fileType === 'pdf') {
    return <iframe className="box-border mt-8 w-full h-[800px] border-0" src={`${filePath}#toolbar=0`} />
  }

  // 对于 Word 文件，我们可以使用 Microsoft Office Online Viewer
  if (fileType === 'word') {
    const encodedUrl = encodeURIComponent(filePath)
    return (
      <iframe
        className="box-border mt-8 w-full h-[800px] border-0"
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`}
      />
    )
  }

  return <div>不支持的文件类型</div>
}

export default DocumentViewer
