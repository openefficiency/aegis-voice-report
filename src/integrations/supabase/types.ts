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
      investigator_queries: {
        Row: {
          answered_at: string | null
          created_at: string | null
          id: string
          investigator_id: string
          query_text: string
          report_id: string
          response_text: string | null
          status: string | null
        }
        Insert: {
          answered_at?: string | null
          created_at?: string | null
          id?: string
          investigator_id: string
          query_text: string
          report_id: string
          response_text?: string | null
          status?: string | null
        }
        Update: {
          answered_at?: string | null
          created_at?: string | null
          id?: string
          investigator_id?: string
          query_text?: string
          report_id?: string
          response_text?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investigator_queries_investigator_id_fkey"
            columns: ["investigator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigator_queries_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      report_actions: {
        Row: {
          action_type: string
          description: string
          id: string
          metadata: Json | null
          performed_by: string | null
          report_id: string
          timestamp: string | null
        }
        Insert: {
          action_type: string
          description: string
          id?: string
          metadata?: Json | null
          performed_by?: string | null
          report_id: string
          timestamp?: string | null
        }
        Update: {
          action_type?: string
          description?: string
          id?: string
          metadata?: Json | null
          performed_by?: string | null
          report_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_actions_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_actions_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          assigned_to: string | null
          audio_url: string | null
          categories: string[] | null
          created_at: string | null
          date_reported: string | null
          full_transcript: string | null
          id: string
          priority: string | null
          reported_by: string | null
          status: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          vapi_call_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          audio_url?: string | null
          categories?: string[] | null
          created_at?: string | null
          date_reported?: string | null
          full_transcript?: string | null
          id?: string
          priority?: string | null
          reported_by?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          vapi_call_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          audio_url?: string | null
          categories?: string[] | null
          created_at?: string | null
          date_reported?: string | null
          full_transcript?: string | null
          id?: string
          priority?: string | null
          reported_by?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          vapi_call_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          amount: number | null
          approved_by: string | null
          created_at: string | null
          currency: string | null
          id: string
          paid_at: string | null
          report_id: string
          status: string | null
          whistleblower_id: string | null
        }
        Insert: {
          amount?: number | null
          approved_by?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          paid_at?: string | null
          report_id: string
          status?: string | null
          whistleblower_id?: string | null
        }
        Update: {
          amount?: number | null
          approved_by?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          paid_at?: string | null
          report_id?: string
          status?: string | null
          whistleblower_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rewards_whistleblower_id_fkey"
            columns: ["whistleblower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
