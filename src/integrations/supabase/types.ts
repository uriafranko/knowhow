export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      class: {
        Row: {
          audio_url: string | null
          course_id: number
          created_at: string
          description: string | null
          duration: string | null
          id: number
          index: number
          name: string
          outcome: string | null
          presentation: string | null
          questions: string[] | null
          research: string | null
          resources: string[] | null
          transcription: string | null
        }
        Insert: {
          audio_url?: string | null
          course_id: number
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: number
          index: number
          name: string
          outcome?: string | null
          presentation?: string | null
          questions?: string[] | null
          research?: string | null
          resources?: string[] | null
          transcription?: string | null
        }
        Update: {
          audio_url?: string | null
          course_id?: number
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: number
          index?: number
          name?: string
          outcome?: string | null
          presentation?: string | null
          questions?: string[] | null
          research?: string | null
          resources?: string[] | null
          transcription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      class_completed: {
        Row: {
          class_id: number
          course_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          class_id: number
          course_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          class_id?: number
          course_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_completed_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_completed_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      course: {
        Row: {
          completed_count: number
          created_at: string
          creator_id: string | null
          description: string | null
          id: number
          is_ready: boolean | null
          outcome: string | null
          saved_count: number
          topic: string
        }
        Insert: {
          completed_count?: number
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: number
          is_ready?: boolean | null
          outcome?: string | null
          saved_count?: number
          topic: string
        }
        Update: {
          completed_count?: number
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: number
          is_ready?: boolean | null
          outcome?: string | null
          saved_count?: number
          topic?: string
        }
        Relationships: []
      }
      course_completed: {
        Row: {
          course_id: number
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_completed_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      saved_course: {
        Row: {
          course_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_course_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
