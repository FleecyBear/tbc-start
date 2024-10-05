import Link from "next/link";

export default function Navigation() {
    return (
        <ul>
            <li>
                <Link href="/">მთავარი</Link>
            </li>
            <li>
                <Link href="/assignment-3">Assignment - 3</Link>
            </li>
            <li>
                <Link href="/about">ჩვენს შესახებ</Link>
            </li>
            <li>
                <Link href="/blog">ბლოგი</Link>
            </li>
            <li>
                <Link href="/profile">პროფილი</Link>
            </li>
            <li>
                <Link href="/contact">კონტაქტი</Link>
            </li>
        </ul >
    )
}