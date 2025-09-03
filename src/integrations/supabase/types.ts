export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      client_services: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          is_active: boolean | null
          notes: string | null
          service_description: string | null
          service_name: string
          service_provider_id: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          service_description?: string | null
          service_name: string
          service_provider_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          service_description?: string | null
          service_name?: string
          service_provider_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_services_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_support_document_assignments: {
        Row: {
          client_id: string
          created_at: string
          document_id: string
          id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          document_id: string
          id?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          document_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_support_document_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          company_name: string
          contact_email: string
          contact_name: string | null
          created_at: string
          id: string
          jira_api_token: string | null
          jira_base_url: string | null
          jira_connected: boolean | null
          jira_email: string | null
          jira_last_sync: string | null
          jira_last_test: string | null
          phone: string | null
          stripe_customer_id: string | null
          stripe_email: string | null
          stripe_portal_url: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          company_name: string
          contact_email: string
          contact_name?: string | null
          created_at?: string
          id?: string
          jira_api_token?: string | null
          jira_base_url?: string | null
          jira_connected?: boolean | null
          jira_email?: string | null
          jira_last_sync?: string | null
          jira_last_test?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          stripe_email?: string | null
          stripe_portal_url?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          company_name?: string
          contact_email?: string
          contact_name?: string | null
          created_at?: string
          id?: string
          jira_api_token?: string | null
          jira_base_url?: string | null
          jira_connected?: boolean | null
          jira_email?: string | null
          jira_last_sync?: string | null
          jira_last_test?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          stripe_email?: string | null
          stripe_portal_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          created_at: string
          id: string
          jira_account_id: string | null
          name: string
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          start_date: string | null
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          jira_account_id?: string | null
          name: string
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          start_date?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          jira_account_id?: string | null
          name?: string
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          start_date?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_services: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          notes: string | null
          service_id: string | null
          start_date: string | null
          status: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_date?: string | null
          status?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_services_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          employee_count: string | null
          first_name: string
          form_type: string
          id: string
          industry: string | null
          last_name: string
          message: string
          phone: string | null
          preferred_date: string | null
          request_consultation: boolean | null
          subject: string | null
          subscribe_newsletter: boolean | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          employee_count?: string | null
          first_name: string
          form_type?: string
          id?: string
          industry?: string | null
          last_name: string
          message: string
          phone?: string | null
          preferred_date?: string | null
          request_consultation?: boolean | null
          subject?: string | null
          subscribe_newsletter?: boolean | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          employee_count?: string | null
          first_name?: string
          form_type?: string
          id?: string
          industry?: string | null
          last_name?: string
          message?: string
          phone?: string | null
          preferred_date?: string | null
          request_consultation?: boolean | null
          subject?: string | null
          subscribe_newsletter?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      phone_extensions: {
        Row: {
          company_id: string | null
          created_at: string
          extension_number: string
          id: string
          is_active: boolean | null
          user_name: string
          voicemail_email: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          extension_number: string
          id?: string
          is_active?: boolean | null
          user_name: string
          voicemail_email?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          extension_number?: string
          id?: string
          is_active?: boolean | null
          user_name?: string
          voicemail_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_extensions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          access_permissions: Json | null
          company_id: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          jira_email: string | null
          job_title: string | null
          last_login: string | null
          phone: string | null
          reset_token_expires_at: string | null
          reset_token_hash: string | null
          reset_token_used_at: string | null
          role: string
          stripe_customer_id: string | null
          support_options: Json | null
          updated_at: string
        }
        Insert: {
          access_permissions?: Json | null
          company_id?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          jira_email?: string | null
          job_title?: string | null
          last_login?: string | null
          phone?: string | null
          reset_token_expires_at?: string | null
          reset_token_hash?: string | null
          reset_token_used_at?: string | null
          role?: string
          stripe_customer_id?: string | null
          support_options?: Json | null
          updated_at?: string
        }
        Update: {
          access_permissions?: Json | null
          company_id?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          jira_email?: string | null
          job_title?: string | null
          last_login?: string | null
          phone?: string | null
          reset_token_expires_at?: string | null
          reset_token_hash?: string | null
          reset_token_used_at?: string | null
          role?: string
          stripe_customer_id?: string | null
          support_options?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      support_documents: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          id: string
          title: string
          url: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          title: string
          url: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
