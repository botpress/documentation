import cx from 'classnames'
import React from 'react'

const components = {
  H4: (props: JSX.IntrinsicElements['h4']): JSX.Element => (
    <h4 {...props} className={cx('mt-6 text-xl font-bold', props.className)} />
  ),
  H5: (props: JSX.IntrinsicElements['h5']): JSX.Element => (
    <h5 {...props} className={cx('tracking-wide text-zinc-900', props.className)} />
  ),
  H6: (props: JSX.IntrinsicElements['h6']): JSX.Element => (
    <h6 {...props} className={cx('tracking-wide text-zinc-900', props.className)} />
  ),
  P: (props: JSX.IntrinsicElements['p']): JSX.Element => (
    <p {...props} className={cx('mb-2 tracking-wide text-zinc-600', props.className)} />
  ),
  Hr: (props: JSX.IntrinsicElements['hr']): JSX.Element => <hr className={cx('my-12', props.className)} />,
  A: (props: JSX.IntrinsicElements['a']): JSX.Element => (
    <a
      {...props}
      className={cx(
        'font-normal text-zinc-600 underline decoration-blue-500 decoration-2 underline-offset-1 hover:text-zinc-900 hover:decoration-4 hover:underline-offset-2',
        props.className
      )}
    />
  ),
  Ol: (props: JSX.IntrinsicElements['ol']): JSX.Element => (
    <ol
      {...props}
      className={cx(
        'mb-4 list-decimal space-y-2 pl-5 tracking-wide text-zinc-600 marker:text-zinc-800',
        props.className
      )}
    />
  ),
  Ul: (props: JSX.IntrinsicElements['ul']): JSX.Element => (
    <ul {...props} className={cx('mb-4 list-disc space-y-2 pl-5 tracking-wide text-zinc-600 ', props.className)} />
  ),
  Li: (props: JSX.IntrinsicElements['li']): JSX.Element => (
    <li {...props} className={cx('text-zinc-600', props.className)} />
  ),
  Br: (props: JSX.IntrinsicElements['br']): JSX.Element => <br {...props} />,
  Img: (props: JSX.IntrinsicElements['img']): JSX.Element => <img {...props} className={cx('mb-6', props.className)} />,
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Table: (props: JSX.IntrinsicElements['table']): JSX.Element => (
    <table {...props} className={cx('w-full border-collapse', props.className)} />
  ),
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Tbody: (props: JSX.IntrinsicElements['tbody']): JSX.Element => (
    <tbody {...props} className={cx('border', props.className)} />
  ),
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Td: (props: JSX.IntrinsicElements['td']): JSX.Element => (
    <td
      {...props}
      className={cx('block border border-zinc-300 p-2 text-zinc-600 dark:text-gray-200 lg:table-cell', props.className)}
    />
  ),
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Th: (props: JSX.IntrinsicElements['th']): JSX.Element => (
    <th {...props} className={cx('block border border-zinc-300 p-2 lg:table-cell', props.className)} />
  ),
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Thead: (props: JSX.IntrinsicElements['thead']): JSX.Element => (
    <thead {...props} className={cx('border', props.className)} />
  ),
  /**
   * @deprecated use markdown instead like in overview.mdx
   */
  Tr: (props: JSX.IntrinsicElements['tr']): JSX.Element => (
    <tr {...props} className={cx('even:bg-zinc-100 dark:even:bg-gray-600/20', props.className)} />
  ),
}

export default components
