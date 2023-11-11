interface TodoItem {
  _id: number;
  title: string;
  content: string;
  // done: true;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

// 리스트 조회 response
interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 상세조회, 수정, 등록 response
interface TodoResponse {
  ok: number;
  item: TodoItem;
}
