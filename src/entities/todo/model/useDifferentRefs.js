const useCombinedRefs = (...refs) => {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue

      if (typeof ref === 'function') {
        ref(node)
      } else {
        ref.current = node
      }
    }
  }
}

export default useCombinedRefs;