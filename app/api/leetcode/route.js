import { NextResponse } from "next/server";

export async function GET() {
  const LEETCODE_API_URL = "https://leetcode.com/graphql";
  const LEETCODE_USERNAME = "ankit_bh_";

  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const data = result.data;
    const stats = data.matchedUser.submitStatsGlobal.acSubmissionNum;

    return NextResponse.json({
      totalSolved: stats.find((s) => s.difficulty === "All").count,
      easySolved: stats.find((s) => s.difficulty === "Easy").count,
      mediumSolved: stats.find((s) => s.difficulty === "Medium").count,
      hardSolved: stats.find((s) => s.difficulty === "Hard").count,
      ranking: data.matchedUser.profile.ranking,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
