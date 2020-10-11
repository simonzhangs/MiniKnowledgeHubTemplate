## Container 包

包 Container 包含 3 个子包，分别是 heap、list、ring。

包 Heap 为实现 heap.Interface 的任何类型提供堆操作。堆是具有属性的树，每个节点都是其子树中的最小值节点。树中的最小元素是根，索引为 0。堆是实现优先级队列的常用方法。要构建优先级队列，请使用（负）优先级作为 Less 方法的排序来实现 Heap 接口，因此 Push 会添加项目，而 Pop 会从队列中删除最高优先级的项目。

```
// This example demonstrates an integer heap built using the heap interface.
package main

import (
	"container/heap"
	"fmt"
)

// An IntHeap is a min-heap of ints.
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	// Push and Pop use pointer receivers because they modify the slice's length,
	// not just its contents.
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// This example inserts several ints into an IntHeap, checks the minimum,
// and removes them in order of priority.
func main() {
	h := &IntHeap{2, 1, 5}
	heap.Init(h)
	heap.Push(h, 3)
	fmt.Printf("minimum: %d\n", (*h)[0])
	for h.Len() > 0 {
		fmt.Printf("%d ", heap.Pop(h))
	}
}

```

包 List 实现了双向链表。

```
package main

import (
	"container/list"
	"fmt"
)

func main() {
	// Create a new list and put some numbers in it.
	l := list.New()
	e4 := l.PushBack(4)
	e1 := l.PushFront(1)
	l.InsertBefore(3, e4)
	l.InsertAfter(2, e1)

	// Iterate through list and print its contents.
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}

}
```

包 Ring 实现循环列表上的操作。
一个环是圆形列表或环的元素。Rings 没有开头或结尾; 指向任何环元素的指针用作对整个环的引用。空环表示为零环指针。Ring 的零值是具有零值的单元素环。

```
type Ring struct {
        Value interface{} // for use by client; untouched by this library
        // contains filtered or unexported fields
}
```

示例：

```
package main

import (
	"container/ring"
	"fmt"
)

func main() {
	// Create a new ring of size 5
	r := ring.New(5)

	// Get the length of the ring
	n := r.Len()

	// Initialize the ring with some integer values
	for i := 0; i < n; i++ {
		r.Value = i
		r = r.Next()
	}

	// Iterate through the ring and print its contents
	for j := 0; j < n; j++ {
		fmt.Println(r.Value)
		r = r.Next()
	}

}
```
