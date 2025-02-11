"use client";
import withAuth from "@/utils/withAuth";
import Sidebar from "@/components/Sidebar/Sidebar";
import {ChartArea} from "@/components/Charts/ChartArea";
import {ChartBar} from "@/components/Charts/ChartBar";
import {ChartLine} from "@/components/Charts/ChartLine";
import {ChartPie} from "@/components/Charts/ChartPie";
const success = () => {
    return (
        <div className="flex min-h-svh items-center justify-center p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <ChartLine />
                <ChartBar />
                <ChartArea />
                <ChartPie />
            </div>
        </div>
    );
}
export default withAuth(success);