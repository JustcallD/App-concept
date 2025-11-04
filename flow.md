

* Account types (public/private)
* Follow logic
* Mutual-follow requirement for friendship
* Post visibility levels
* Chat permissions
* Edge case: what happens if a friend unfollows

Here’s the detailed flow:

---

## **1️⃣ Account Creation**

1. User signs up → chooses account type:

   * **Public** → auto-approve followers
   * **Private** → follow requests require approval

---

## **2️⃣ Follow Flow**

```
User A wants to follow User B
|
|-- If B is Public → Auto-approved → A becomes Follower
|
|-- If B is Private → Follow request sent → B approves/rejects → If approved → A becomes Follower
```

* **Follower visibility:**

  * Can see posts based on post visibility (followers & friends, or friends-only posts not visible yet)

---

## **3️⃣ Friend Eligibility Flow (Mutual Follow Required)**

```
User A follows User B AND User B follows User A
         |
         V
Can Send Friend Request?
         |
         +---> Yes → User B accepts → Both become Friends
         |
         +---> No → Cannot send friend request
```

* **Friend benefits:**

  * Chat freely
  * Access friend-only posts

---

## **4️⃣ Post Visibility**

| Post Type           | Who Can See It                  |
| ------------------- | ------------------------------- |
| Public Post         | Everyone (only public accounts) |
| Followers & Friends | Approved followers + friends    |
| Friends Only        | Mutual friends only             |
| Close Friends       | Selected friends only           |

* **Private accounts:** default is followers + friends
* **Public accounts:** default is public, can select friend-only

---

## **5️⃣ Chat / Messaging Flow**

```
Friends → Can chat freely
Mutual followers (non-friends) → Cannot chat until friend request is accepted
One-way followers → Cannot chat
```

* Optional: chat request can be enabled for followers **after friendship eligibility**

---

## **6️⃣ Unfollow Edge Case (Friendship Persistence)**

```
Friendship Established (mutual-follow required initially)
         |
   One user unfollows the other
         |
Recommended Rule → Friendship persists
         |
- Friend-only posts remain visible
- Chat remains accessible
- Non-friend posts visibility updated based on current follower status
```

* **Alternative (optional):** End friendship automatically if strict mutual-follow rule desired

---

## **7️⃣ Overall System Flow (Text Diagram)**

```
[Account Created] → Public / Private
         |
         V
    [Follow User?]
         |
  +------|-------+
  |              |
Public        Private
  |              |
Auto-Follow   Send Follow Request
  |              |
  V              V
[Follower] ----> Approve? ----> [Follower]
         |
         V
Check mutual following
         |
         V
Mutual? 
  | Yes → Can Send Friend Request
  | No  → Cannot send Friend Request
         |
   +-----|-----+
   |           |
Accepted     Rejected
   |           |
 [Friend]     Stay as Mutual Followers
   |
   V
Friendship persists even if one unfollows
   |
   V
- Can Chat Freely
- Access Friend-Only Posts
- Feed & Stories visibility updated based on current follower status
```

---

✅ **Key Rules Summary**

1. **Mutual following required** to send a friend request
2. **Friendship persists** even if one user unfollows
3. **Post visibility** respects both friendship and follower status
4. **Chat access**: friends only; one-way followers cannot chat until friendship
5. **Private account posts** visible only to approved followers and friends

---

