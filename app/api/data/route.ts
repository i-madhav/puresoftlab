import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd() , 'public/task-data.json');
    const fileContent = fs.readFileSync(filePath , 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
}