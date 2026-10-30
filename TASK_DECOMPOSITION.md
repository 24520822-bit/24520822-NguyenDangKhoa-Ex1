# TASK_DECOMPOSITION.md

**Exercise 1: Semantic Engineer & Pro-Gamer Profile Card**
Stack: React 19 + Vite | Constraint: Zero Div-Soup | Target: iPhone SE 375px

## Quy tắc đồng bộ Task ↔ Commit

- Mỗi task bên dưới tương ứng đúng **1 commit**.
- **Tiêu đề task = commit message**, giống từng ký tự (kể cả prefix `feat(ex1):`, `style(ex1):`).
- Mỗi commit phải build được (`npm run build` không lỗi) và qua phần kiểm tra của chính task đó.
- Thứ tự commit trong `git log` phải đúng thứ tự task: Task 0 → Task 1 → Task 2.

## Tổng quan

| # | Task = Commit message | File chính | Ước lượng |
|---|---|---|---|
| 0 | `chore(init): scaffold Vite React 19 project` | `package.json`, `src/main.jsx`, `src/App.jsx` | 3' |
| 1 | `feat(ex1): implement semantic DeveloperCard and SkillBadge` | `SkillBadge.jsx`, `DeveloperCard.jsx`, `DeveloperCard.module.css` (skeleton), `App.jsx` | 15' |
| 2 | `style(ex1): add responsive 375px CSS module` | `DeveloperCard.module.css` | 12' |
| | Chạy audit cuối (không commit) | `ex1-verification-audit.sh` | 5' |

> Hai commit bắt buộc của đề là Task 1 và Task 2. Task 0 là commit khởi tạo cấp repo, dùng scope `init` (không phải `ex1`) để tách khỏi phần bài tập.

---

## Task 0: `chore(init): scaffold Vite React 19 project`

**Mục tiêu:** Có project chạy được, sạch boilerplate.

- [ ] `npm create vite@latest` với template React, xác nhận `react` và `react-dom` là v19
- [ ] Xóa `App.css`, asset mẫu, logo Vite/React
- [ ] `App.jsx` chỉ còn khung tối thiểu (dùng `<main>`, không dùng `div`)
- [ ] Thêm `.gitignore` (`node_modules`, `dist`)
- [ ] Thêm file `TASK_DECOMPOSITION.md` này vào repo

**Kiểm tra:** `npm run dev` mở được trang trắng, `npm run build` thành công.

---

## Task 1: `feat(ex1): implement semantic DeveloperCard and SkillBadge`

**Mục tiêu:** Hai component đúng ngữ nghĩa, đúng ràng buộc div/HTTPS/CLS. Chưa cần đẹp.

### 1.1 `src/components/SkillBadge.jsx`
- [ ] Nhận props `{ name, tier }`, trả về một `<li>`
- [ ] Hiển thị `name` và `tier`
- [ ] Không có `<div>`

### 1.2 `src/components/DeveloperCard.module.css` (skeleton)
- [ ] Chỉ khai báo các class: `card`, `header`, `avatar`, `avatarFallback`, `metrics`, `skills`
- [ ] Vài style tối thiểu để file không rỗng (ví dụ `.card { box-sizing: border-box; }`)
- [ ] Mục đích duy nhất: để commit này build được

### 1.3 `src/components/DeveloperCard.jsx`
- [ ] `import { Fragment, useState } from 'react'` và `import styles from './DeveloperCard.module.css'`
- [ ] ES6 default parameters cho `fullName`, `role`, `avatarUrl`, `metrics`, `skills`
- [ ] `avatarUrl` mặc định dùng `https://`
- [ ] Cấu trúc: `<article aria-labelledby="dev-heading">` → `<header>` (avatar + `<hgroup>` với `<h2 id="dev-heading">` và `<p>`) → `<dl>` → `<ul aria-label="Engineered Skills">`
- [ ] `<img>` có `alt={fullName}`, `width="64"`, `height="64"`
- [ ] Fallback: `useState(false)` cho `imgFailed`, `onError` đặt `true`, khi lỗi render `<span>` chứa chữ cái đầu của `fullName`
- [ ] Metrics: `Object.entries(metrics).map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)`
- [ ] Skills: `skills.map((s) => <SkillBadge key={s.id} {...s} />)`
- [ ] Không inline `style={{ ... }}`

### 1.4 `src/App.jsx`
- [ ] Render `<DeveloperCard />` bên trong `<main>`

### Kiểm tra Task 1
```bash
grep -n '<div' src/components/DeveloperCard.jsx      # 0 match
grep -n 'http://' src/components/DeveloperCard.jsx   # 0 match
npm run build                                        # thành công
```
- Lưu ý: `grep` tìm cả trong comment, nên không viết `<div` hay `http://` ở bất kỳ dòng nào của file.
- Thử avatar URL hỏng để xác nhận fallback initials hiện ra.

---

## Task 2: `style(ex1): add responsive 375px CSS module`

**Mục tiêu:** Giao diện hoàn chỉnh, không cuộn ngang ở 375px. Chỉ sửa file CSS.

- [ ] Custom Properties trên `.card` hoặc `:root` trong module: `--card-bg`, `--card-fg`, `--accent`, `--radius`, `--space-sm`, `--space-md`
- [ ] `.card`: `max-width: 100%`, `box-sizing: border-box`, padding và border-radius dùng biến
- [ ] `.header`: flex, `gap`, avatar cố định 64×64, `object-fit: cover`, `border-radius`
- [ ] `.avatarFallback`: cùng kích thước 64×64 với ảnh, căn giữa chữ initials (tránh layout nhảy)
- [ ] `.metrics`: grid `repeat(auto-fit, minmax(0, 1fr))` hoặc flex-wrap, `dt`/`dd` căn chỉnh gọn
- [ ] `.skills`: `list-style: none`, flex-wrap, badge dạng pill
- [ ] Chống tràn: `overflow-wrap: anywhere` cho role và tên dài, không dùng `width` cố định, không `white-space: nowrap`
- [ ] Media query cho màn nhỏ hơn 400px nếu cần xếp header theo cột

### Kiểm tra Task 2
- Chrome DevTools → Device Toolbar → iPhone SE (375px): không có thanh cuộn ngang
- Thử `fullName` rất dài và `skills` nhiều phần tử, layout vẫn không vỡ
- Accessibility Tree: `article → header + dl + list`
- Git diff của commit chỉ chứa `DeveloperCard.module.css`

---

## Checkpoint cuối (không commit)

```bash
# 1. Không có div trong component
grep -n '<div' src/components/DeveloperCard.jsx        # Expected: 0 matches

# 2. Chỉ dùng HTTPS
grep -n 'http://' src/components/DeveloperCard.jsx     # Expected: 0 matches

# 3. Git log khớp task
git log --oneline
# Expected (mới → cũ):
#   style(ex1): add responsive 375px CSS module
#   feat(ex1): implement semantic DeveloperCard and SkillBadge
#   chore(init): scaffold Vite React 19 project
```

## Cách đẩy lên GitHub

```bash
git init
git branch -M main
git add . && git commit -m "chore(init): scaffold Vite React 19 project"
# ...làm Task 1, rồi:
git add . && git commit -m "feat(ex1): implement semantic DeveloperCard and SkillBadge"
# ...làm Task 2, rồi:
git add . && git commit -m "style(ex1): add responsive 375px CSS module"
git remote add origin <repo-url>
git push -u origin main
```
