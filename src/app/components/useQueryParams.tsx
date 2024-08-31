import { useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function useParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useMemo(
        () => new URLSearchParams(searchParams),
        [searchParams],
    );

    const setParam = useCallback(
        (name: string, value: string) => {
            params.set(name, value);
            router.push(pathname + "?" + params.toString());
        },
        [params, pathname, router],
    );

    const vals: [URLSearchParams, Function] = [params, setParam];
    return vals;
}
