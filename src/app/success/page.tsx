"use client";
import withAuth from "@/utils/withAuth";
const success = () => {
    return (
        <div>
            <h1>Success</h1>
        </div>
    );
}
export default withAuth(success);